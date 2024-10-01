import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";

const NgoProfile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://team23-ngo-backend.onrender.com/api/v1/user/getDetails",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZhNmNkNTI0MjhhNTg4MDgyOWY4M2YiLCJyZWdpc3RyYXRpb25OdW1iZXIiOiJOR08xMjM0NTY3ODkiLCJpYXQiOjE3Mjc3MTkxNzAsImV4cCI6MTcyNzgwNTU3MH0.23RxbymNJWU7sT8enPvb71qDmc0x7oJATCycjq9zkMQ",
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
        const responseJson = await response.json();
        console.log("API Response:", responseJson);
  
        if (responseJson && responseJson.data && Array.isArray(responseJson.data) && responseJson.data.length > 0) {
          const mappedData = responseJson.data.map((user) => ({
            id: user._id,
            name: user.name,
            // Add other fields as necessary
          }));
          setUserData(mappedData);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        setError(error.message);
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Layout />
      <section className="w-full overflow-hidden text-black">
        <div className="flex flex-col">
          {/* <!-- Cover Image --> */}
          <img
            src={userData.length > 0 ? userData[0].coverImage : ""}
            alt="User Cover"
            className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
          />
  
          {/* <!-- Profile Image --> */}
          <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
            <img
              src={userData.length > 0 ? userData[0].avatar : ""}
              alt="User Profile"
              className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
            />
  
            {/* <!-- USERName --> */}
            <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-green-600 lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
              {userData.length > 0 ? userData[0].name : "No Name Available"}
            </h1>
          </div>
  
          <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
            {/* <!-- Description --> */}
            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
              <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-black">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-green-600 md:text-lg">Name</dt>
                      <dd className="text-black text-lg font-semibold">
                        {userData.length > 0 ? userData[0].name : ""}
                      </dd>
                    </div>
                    {/* Add other fields as necessary */}
                  </dl>
                </div>
                {/* Add other sections as necessary */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NgoProfile;
