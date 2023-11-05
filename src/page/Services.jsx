import Header from "../components/ui/Header";
import Container from "../components/ui/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import ServiceCard from "../components/ServiceCard";
import { useState } from "react";
import { capitalizeWords } from "../utils/Capitalize";

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
  // console.log(category);
  // console.log(price);
  const getServices = async () => {
    const res = await axios.get(
      `/services?sortField=price&sortOrder=${price}&category=${category}`
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
    queryKey: ["service", price, category], //eta somehow dependency hisabe kaj kore price/category change hole refetch hbe
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
        {isLoading ? <p>Loading....</p> :
        <div className="grid grid-cols-3 gap-10">
          {/* Service Cards goes here */}
          {services?.data?.result.map((item) => (
            <ServiceCard key={item._id} service={item}></ServiceCard>
          ))}
        </div>}
      </Container>
      <Container className="mb-16 -mt-48 flex justify-end">
        <div className="join border-2 border-primary">
          <button className="join-item btn btn-ghost">Prev</button>
          <button className="join-item btn btn-ghost">2</button>
          <button className="join-item btn  btn-ghost">3</button>
          <button className="join-item btn btn-ghost">4</button>
          <button className="join-item btn btn-ghost">Next</button>
        </div>
      </Container>
    </>
  );
};

export default Services;
