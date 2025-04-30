'use client'

import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";
import { Standard } from "@typebot.io/nextjs";

export default function ChatbotPage() {
    
    const typebotId = process.env.TYPEBOT_ID;
    const typebotApiHost = process.env.TYPEBOT_APIHOST;

    return(
        <div className="bg-[#d9d9d9]">
            <NavPages nome="Chatbot" />
            <Standard 
                typebot={typebotId}
                apiHost={typebotApiHost}
                style={{ width: "100%", height: "650px", marginBottom: "8px" }}
            />
            <BottomNavigation />
        </div>
    )
}