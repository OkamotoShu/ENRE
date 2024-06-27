import Image from "next/image";
import { fetchReward } from "@/lib/dbActions";
import ProgressBar from "react-bootstrap/ProgressBar";

export default async function CharactorComponent() {
  const handleCharactorClick = () => {
    const quoteList = ["おはよ", "暑いね", "お腹すいた"];
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    return quoteList[randomIndex];
  };

  const quote = handleCharactorClick();
  // TODO デバッグ用なので変更する
  const { currentReward, prevReward } = await fetchReward();
  // const currentReward = 104;

  const evoThresholdList = [0, 6, 50, 100, 500];
  const evoState =
    evoThresholdList[0] <= currentReward && currentReward < evoThresholdList[1] ? 1 :
      evoThresholdList[1] <= currentReward && currentReward < evoThresholdList[2] ? 2 :
        evoThresholdList[2] <= currentReward && currentReward < evoThresholdList[3] ? 3 :
          evoThresholdList[3] <= currentReward && currentReward < evoThresholdList[4] ? 4 : 4;
  const nextEvoThreshold = evoThresholdList[evoState];
  const imageName = "/icon" + evoState + ".png";

  // TODO ガマちゃん分岐成長処理
  // TODO 姿を変える
  // ここでポイント別のやつを取得できるとする
  const currentRewardOurDoor = 100;
  const currentRewardKnowledge = 100;
  const currentRewardCommunity = 101;

  const currentRewordList =  [currentRewardOurDoor,currentRewardKnowledge,currentRewardCommunity];
  const gamaType = currentRewordList.indexOf(Math.max(...currentRewordList));
  const gamaTypeString = ["アウトドア","ナレッジ","コミュニティ"][gamaType];
  const gamaTypeStringColor = "font-bold " + ["text-red-600","text-blue-600","text-yellow-600"][gamaType];

  return (
    <div className="w-full">
      {/* ふきだし */}
      <div className="flex justify-center">
        <svg
          width="305"
          height="140"
          viewBox="0 0 305 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7/12 h-auto max-h-14 pl-20"
        >
          <rect width="305" height="127" rx="10" fill="#ffffff" />
          <path
            d="M69.118 138.921L55.0857 124.844L82.7964 124.5L69.118 138.921Z"
            fill="#ffffff"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="black"
            className="text-4xl font-bold"
          >
            {quote}
          </text>
        </svg>
      </div>
      <div className="px-20 flex justify-center items-center">
        <div className="max-w-xs">
          <Image
            src={imageName}
            width={400}
            height={400}
            alt="charactor"
            priority
          />
        </div>
      </div>
      <div className="grid grid-rows-2 grid-cols-4 justify-items-center items-center p-2 ">
        <div className="row-start-1 col-start-1 col-end-2 text-sm">合計</div>
        <div className="row-start-2 col-start-1 col-end-2 text-xl font-bold text-green-600">
          {currentReward}pt
        </div>
        <div className="row-start-1 col-start-2 col-end-5 place-self-start self-center text-sm">
          {evoState != 4 && (
            <span>
              成長まで: <span className="font-bold">{nextEvoThreshold - currentReward}pt</span>
            </span>
          )}
          {evoState == 4 && (
            <span>
              タイプ: <span className={gamaTypeStringColor}>{gamaTypeString}</span>
            </span>
          )}
        </div>
        <div className="row-start-2 col-start-2 col-end-5 w-full">
          {/* <ProgressBar variant="success" now={currentReward} max={nextEvoThreshold} /> */}
          {(evoState != 4) && (
            <ProgressBar variant="success" now={currentReward} max={nextEvoThreshold} />
          )}
          {(evoState == 4) && (
            <ProgressBar >
              <ProgressBar variant="danger" now={currentRewardOurDoor} key={1} max={500} />
              <ProgressBar variant="info" now={currentRewardKnowledge} key={2} max={500} />
              <ProgressBar variant="warning" now={currentRewardCommunity} key={3} max={500} />
            </ProgressBar>
          )}
        </div>
      </div>
    </div>
  );
}
