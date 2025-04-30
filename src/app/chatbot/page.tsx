import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";
import { Standard } from "@typebot.io/nextjs";

export default function Chatbot() {

    const typebotId = process.env.TYPEBOT_ID;
    const typebotApiHost = process.env.TYPEBOT_APIHOST;
    return(
        <div>
            <NavPages nome="Chatbot" />
            <Standard 
                typebot={typebotId}
                apiHost={typebotApiHost}
                style={{ width: "100%", height: "600px" }}
            />
            <BottomNavigation />
        </div>
    )
}