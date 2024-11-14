import { isUser } from "@/utils/functions/checks";
import { redirect } from "next/navigation";

const Home = async () => {
    const { isUser: yes, isParent } = await isUser();
    
    if (!yes) redirect("/protected/welcome")
    if (isParent) redirect("/protected/parent")
    else redirect("/protected/child")
};

export default Home;
