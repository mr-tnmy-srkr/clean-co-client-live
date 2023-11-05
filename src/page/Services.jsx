import Header from "../components/ui/Header";
import Container from "../components/ui/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import ServiceCard from "../components/ServiceCard";
import { useState } from "react";
import { capitalizeWords } from "../utils/Capitalize";
import { GrNext, GrPrevious } from "react-icons/gr";

const categories = [
  "landscaping",
  "home-improvement",
  "home-services",
  "office-services",
];

const Services = () => {
  const axios = useAxios();
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // console.log(category);
  // console.log(price);
  const getServices = async () => {
    const res = await axios.get(
      `/services?sortField=price&sortOrder=${price}&category=${category}&page=${page}&limit=${limit}`
    );
    return res;
  };

  //get korbo tanStack diye
  const {
    status,
    data: services,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service", price, category,page], //eta somehow dependency hisabe kaj kore price/category/page change hole refetch hbe
    queryFn: getServices, //data jeta fetch kore anbe
    /*  queryFn:()=>{
      return axios.get("/services");
    } */
  });
  // console.log(data.data);

  /* if (isLoading) {
    return <p>Loading ....</p>;
  } */
  if (isError) {
    return <p>Error ....{error}</p>;
  }
  // console.log(status);
  // console.log(services?.data?.total);
  const totalPage = Math.ceil(services?.data?.total / limit);

  const handlePrev = () => {
    page > 1 && setPage(page - 1);
  };
  const handleNext = () => {
    page < totalPage && setPage(page + 1);
  };
  // console.log(page);

  // console.log(totalPage);
  return (
    <>
      <Container className="mt-10">
        <Header title="Services">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          nobis excepturi delectus, ab id provident, voluptas iste ullam
          repellendus animi eos perspiciatis cumque. Quod sit laboriosam
          deleniti atque explicabo esse.
        </Header>
      </Container>
      <Container>
        <div className="my-12 flex justify-end items-center border-2 border-primary rounded-2xl p-5 gap-5">
          <h1 className="flex-1 text-xl font-semibold">
            Over {services?.data?.total} services to choose from
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name=""
              id=""
              className="input input-bordered"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected>
                Choose One
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {capitalizeWords(category)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <select
              name=""
              id=""
              className="input input-bordered"
              onChange={(e) => setPrice(e.target.value)}
            >
              <option disabled selected>
                Choose One
              </option>
              <option value="asc">From Low to High</option>
              <option value="desc">From High to Low</option>
            </select>
          </div>
        </div>
      </Container>

      <Container className="mb-64">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {/* Service Cards goes here */}
            {services?.data?.result.map((item) => (
              <ServiceCard key={item._id} service={item}></ServiceCard>
            ))}
          </div>
        )}
      </Container>
      <Container className="mb-16 -mt-48 flex justify-end">
        <div className="join border-2 border-primary">
          <button onClick={handlePrev} className="join-item btn btn-ghost">
            <GrPrevious></GrPrevious>
          </button>
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            [...Array(totalPage).keys()].map((item, idx) => {
              const pageNumber = idx + 1;
              return (
                <button
                  onClick={() => setPage(pageNumber)}
                  key={pageNumber}
                  className={`${
                    pageNumber === page
                      ? "join-item btn btn-primary"
                      : "join-item btn btn-ghost"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })
          )}
          {/* <button className="join-item btn btn-ghost">1</button> */}
          {/* <button className="join-item btn btn-ghost">2</button> */}
          {/* <button className="join-item btn btn-ghost">3</button> */}
          <button onClick={handleNext} className="join-item btn btn-ghost">
            <GrNext></GrNext>
          </button>
        </div>
      </Container>
    </>
  );
};

export default Services;
// Array(totalPage).fill(0)
// [...Array(totalPage).keys()]
// [...Array(totalPage).fill(0)]
