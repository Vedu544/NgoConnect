import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";

const NgoProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZiMWRmMjBiOWJhYzliMzAzMjk1NDciLCJlbWFpbCI6InNhaGlsc2hpdmVrYXJAZ21haWwuY29tIiwiaWF0IjoxNzI3NzU4MTI3LCJleHAiOjE3Mjc4NDQ1Mjd9.89n2snusIn6Ri3kYuoZn5UaSTycUZPNubZVdsyaiLLM";
        const response = await fetch(
          "https://team23-ngo-backend.onrender.com/api/v1/user/getDetails",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseJson = await response.json();
        console.log("API Response:", responseJson);

        if (responseJson.success && responseJson.data) {
          console.log("Data found:", responseJson.data);
          setUserData(responseJson.data); // Access the 'data' property
        } else {
          console.log("No data found in the response");
          throw new Error("No data found in the response");
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
  if (!userData) return <p>No user data available</p>;

  return (
    <>
      <Layout />
      <section className="w-full overflow-hidden text-black">
        <div className="flex flex-col">
          {/* Cover Image */}
          <img
            src={userData.coverImage?.secure_url || ""}
            alt="User Cover"
            className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
          />

          {/* Profile Image */}
          <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
            <img
              src={userData.avatar?.secure_url || ""}
              alt="User Profile"
              className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
            />

            {/* USERName */}
            <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-green-600 lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
              {userData.name || "No Name Available"}
            </h1>
          </div>

          <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4  relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
            {/* Description */}
            <p className="text-black">{userData.description}</p>

            {/* Detail */}
            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
              <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-black">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-green-600 md:text-lg">Name</dt>
                      <dd className="text-black text-lg font-semibold">
                        {userData.name}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-green-600 md:text-lg">Address</dt>
                      <dd className="text-black text-lg font-semibold">
                        {userData.address?.addressLine1}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-green-600 md:text-lg">
                        Registered No.
                      </dt>
                      <dd className="text-black text-lg font-semibold">
                        {userData.registrationNumber}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-green-600 md:text-lg">Contact No</dt>
                      <dd className="text-black text-lg font-semibold">
                        {userData.contact?.phone}
                      </dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-green-600 md:text-lg">Email</dt>
                      <dd className="text-black text-lg font-semibold ">
                        {userData.contact?.email}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NgoProfile;
