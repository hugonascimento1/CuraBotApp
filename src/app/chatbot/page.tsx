'use client'

import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";
import { Standard } from "@typebot.io/nextjs";

export default function ChatbotPage() {
    return(
        <div className="bg-[#d9d9d9]">
            <NavPages nome="Chatbot" />
            <Standard 
                typebot="curabot-dyex2qv"
                apiHost="https://typebot.io"
                style={{ width: "100%", height: "650px", marginBottom: "8px" }}
            />
            <BottomNavigation />
        </div>
    )
}