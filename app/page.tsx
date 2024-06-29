import HeaderComponent from "@/app/ui/header";
import FooterComponent from "@/app/ui/footer";
import CharactorComponent from "./ui/charactor";
import AllEventsCardComponent from "./ui/allEventsCard";
import CheckinEventsCardComponent from "./ui/checkinEventsCard";
import WatchCardComponent from "./ui/watchCard";
import { fetchMode, fetchBoardInfo } from "@/lib/dbActions";
import ComingSoonComponent from "./ui/comingSoon";
import { getUserFromCookie } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  HeaderSkeleton,
  CharacterSkeleton,
  CardSkeleton,
} from "./ui/skeletons";
import BoardComponent from "./ui/board";
import QuestionnaireComponent from "./ui/questionnaire";

export default async function Home() {
  const user = await getUserFromCookie();
  user === null && redirect("/login");
  const mode = await fetchMode(user?.uid); //modecollectionのdevを取ってる、usersのdev(usermode)
  const boardInfo = await fetchBoardInfo();
  const modalInfo = {
    title: boardInfo?.title || "",
    message: boardInfo?.message || "",
    buttonTitle: boardInfo?.buttonTitle || "",
    link: boardInfo?.link || "",
  };

  return (
    <>
      {(mode?.webMode && mode?.userMode) || !mode?.webMode ? ( //firestoreのmodeがtrue且つ開発者ユーザー、またはfirestoreのmodeがfalse
        <>
          <main className="grid grid-rows-base-layout min-h-screen w-full pb-40 overflow-auto justify-items-center items-center">
            <Suspense fallback={<HeaderSkeleton />}>
              <HeaderComponent />
            </Suspense>
            <div className="row-start-2 pt-2 ml-2 mr-2">
              <div className="grid grid-rows-max-content-layout-4 grid-cols-2 gap-2 w-full">
                <div className="row-start-1 col-start-1 col-end-3">
                  {/* TODO 1 スケルトン */}
                  <Suspense fallback={<CharacterSkeleton />}>
                    <CharactorComponent />
                  </Suspense>
                </div>
                <div className="row-start-2 col-start-1 col-end-3 items-center justify-items-center">
                    <CheckinEventsCardComponent />
                </div>
                <div className="row-start-3 col-start-1 col-end-3">
                  {/* 表示速度の改善 */}
                  <WatchCardComponent />
                </div>
                {/* TODO 2 アンケート詳細は見れるようにしたい */}
                <div className="row-start-4 col-start-1 col-end-2">
                  <QuestionnaireComponent
                    link="https://docs.google.com/forms/d/e/1FAIpQLSdnAemr4zSZEag-RtAhnc-mXKA9dNhQIp1_OVISjA8gmLvcyQ/viewform"
                    title="アンケート①"
                  />
                </div>
                <div className="row-start-4 col-start-2 col-end-3">
                  <QuestionnaireComponent
                    link="https://docs.google.com/forms/d/e/1FAIpQLSfgc24HvqvQ7TTc6xBMsGSCD6S37-iDOpDugQ_1cjDOTcM8Bw/viewform"
                    title="アンケート②"
                  />
                </div>
              </div>
            </div>
            <FooterComponent />
          </main>
          {boardInfo !== null && <BoardComponent info={modalInfo} />}
        </>
      ) : (
        <ComingSoonComponent />
      )}
    </>
  );
}
