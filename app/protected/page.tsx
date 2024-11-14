import { isUser } from "@/utils/functions/checks";
import { redirect } from "next/navigation";

const Home = async () => {
    const { isUser: yes, isParent } = await isUser();
    console.log("let me cook", isParent, yes);

    if (!yes) redirect("/protected/welcome")
    if (isParent) redirect("/protected/parent")
    else redirect("/protected/child")
};

export default Home;
