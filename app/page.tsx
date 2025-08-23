import DataHandler from "./components/DataHandler/DataHandler";

// Renders the home screen with the currentWeather and searchForm component
export default function Home() {
    return (
      <div className="flex flex-col px-2 pb-[5rem] h-full w-full">
        <DataHandler showCurrentWeather={true}/>
      </div>
    )
}