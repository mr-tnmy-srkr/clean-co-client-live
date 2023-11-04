import Header from "../components/ui/Header";
import Container from "../components/ui/Container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const Services = () => {
  const [services, setServices] = useState([]);
  const axios = useAxios();

  const getServices = async () => {
    const res = await axios.get("/services");
    return res;
  };

  //get korbo tanStack diye
  const { status, data, error, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
  console.log(data.data);
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
      <Container className="mb-64">
        <div className="grid grid-cols-3 gap-10">
          {/* Service Cards goes here */}
        </div>
      </Container>
    </>
  );
};

export default Services;
