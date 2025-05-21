import axios from "axios";

const GEMINI_API_KEY = "AIzaSyDO0n2s-gfOVaMN27IqVw-8XXnxxwNgppM";

export const suggestTitle = async(noteContent: string) => {
    const prompt = `Suggest only one short, relavant title for this note: ${noteContent},  Do not include any introductory or summary lines.`;
    try{
    const response = axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
         {
            contents: [
                {
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
            ]
         },
         {
            headers: {
                "Content-Type": "application/json"
            }
         }
    );

    const result = (await response).data?.candidates?.[0].content?.parts?.[0].text;
    return result || "untitled"
}
catch(e){
    console.log(e)
}
}

export const correctNotes = async(notes: string) => {
    const prompt = `Give me the corrected notes in a paragraph without spelling and grammatical error for this: ${notes} , Do not include any introductory or summary lines.`;
    try{
        const response = axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
             {
                contents: [
                    {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
                ]
             },
             {
                headers: {
                    "Content-Type": "application/json"
                }
             }
        );
    
        const result = (await response).data?.candidates?.[0].content?.parts?.[0].text;
        return result || "untitled"
    }
    catch(e){
        console.log(e)
    }
}