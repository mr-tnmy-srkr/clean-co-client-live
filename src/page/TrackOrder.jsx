import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Container from "../components/ui/Container";
import toast from "react-hot-toast";

const TrackOrder = () => {
const axios = useAxios()
const {user} = useAuth()
// console.log(user);
const queryClient = useQueryClient()

const {data:bookings,isError,isLoading,error} = useQuery(
  {
    queryKey: ['booking',user],
    queryFn: async () =>{
      const email = user.email
      console.log(email);
      const res = await axios.get(`/user/bookings?email=${email}`);
      return res
    }
  }
)
// console.log(bookings?.data);

const {mutate} = useMutation({
  mutationKey: ["booking"],
  mutationFn: async (id) => {
   const res = await axios.delete(`/user/cancel-booking/${id}`)
    return res
  },
  onSuccess: () => {
    toast.success('Delete Bookings Done')
    queryClient.invalidateQueries({queryKey:["booking"]})
  }
})

if (isError) {
  return <p>Error ....{error}</p>;
}
  return (
    <Container>
     {isLoading? "Loading" : 
      bookings?.data?.map(item=><div key={item._id} className=" border-2 border-green-600 my-10 p-10">
        <h1>{item?.service}</h1>
        <button onClick={()=>mutate(item._id)} className="btn btn-error">Cancel</button>
      </div>)

      }
    </Container>
  );
};

export default TrackOrder;
