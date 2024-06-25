// pages/page2.js
"use client";
import { useData } from "../../context/DataContext";

const Page2 = () => {
  const { data } = useData();

  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>Page 2</h1>
      {/* <p>Name: {data.name}</p> */}
      {console.log(data)}
      <p>Age: {JSON.stringify(data)}</p>
    </div>
  );
};

export default Page2;
