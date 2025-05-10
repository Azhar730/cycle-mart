// import { useGetAllBicycleQuery } from "@/Redux/features/bicycle/bicycle.api";
// import { useNavigate, useParams } from "react-router-dom";

// const CategoryDetails = () => {
//     const { category } = useParams();
//     const navigate = useNavigate();
//     const queryParams = [{ name: "category", value: category }];
//     const { data: response, isLoading, isError } = useGetAllBicycleQuery(queryParams);

//     return (
//         <div className="min-h-screen">
//             CategoryDetails
//             CategoryDetails
//         </div>
//     );
// };

// export default CategoryDetails;

import BicycleCard from "@/components/BicycleCard";
import Loading from "@/components/Loading";
import { useGetAllBicycleQuery } from "@/Redux/features/bicycle/bicycle.api";
import { TBicycle } from "@/types/bicycle.type";
import { useParams } from "react-router-dom";

const CategoryMedicinesPage = () => {
  const { category } = useParams<{ category: string }>();
  const queryParams = [{ name: "category", value: category || "" }];
  
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllBicycleQuery(queryParams);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong!
      </h3>
    );
  }

  if (response?.data.length === 0) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Bicycles not Found
      </h3>
    );
  }

  const bicycles = response?.data;
  return (
    <div className="px-4 py-6 min-h-screen mt-20">
      <h2 className="text-2xl font-bold mb-4 capitalize text-primary">
        {category} Bicycles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bicycles?.map((bicycle: TBicycle, index: number) => (
          <BicycleCard key={index} bicycle={bicycle} />
        ))}
      </div>
    </div>
  );
};

export default CategoryMedicinesPage;
