import MenuComponent from "./menu";
import { getUserFromCookie } from "@/lib/session";
import { redirect } from "next/navigation";
import { fetchUserSettings } from "@/lib/dbActions";

export default async function HeaderComponent() {
  const user = await getUserFromCookie();
  !user && redirect("/login");
  const userSettings = await fetchUserSettings();
  const nickName = userSettings.nickName;

  return (
    <div className="flex justify-between shadow-md fixed top-0 w-full z-10 bg-[#b8e986]">
      <div className="p-4 font-mono text-xl">
        <h1>Enre</h1>
      </div>
      <div className="p-4 font-mono text-sm">
        <MenuComponent nickName={nickName} />
      </div>
    </div>
  );
}
