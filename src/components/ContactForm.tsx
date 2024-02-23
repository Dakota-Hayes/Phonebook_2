import Input from "./Input"
import Button from "./Button"
import {useForm} from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseFirst,chooseLast,chooseAddress,chooseEmail,choosePhone } from "../redux/slices/RootSlice"

interface ContactFormProps {
  id?: string []
}

const ContactForm = (props:ContactFormProps) => {
  const {register, handleSubmit} = useForm({})
  const dispatch = useDispatch();
  const store = useStore();
  const onSubmit = (data: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id);
    console.log(data);
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.first } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
    } else {
      dispatch(chooseFirst(data.first));
      dispatch(chooseLast(data.last));
      dispatch(chooseEmail(data.email));
      dispatch(choosePhone(data.phone_number));
      dispatch(chooseAddress(data.address));

      server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 1000);
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first">Contact First Name</label>
          <Input {...register('first')} name="first" placeholder="First Name"/>
        </div>
        <div>
          <label htmlFor="last">Contact Name</label>
          <Input {...register('last')} name="last" placeholder="Last Name"/>
        </div>
        <div>
          <label htmlFor="email">Contact Email</label>
          <Input {...register('email')} name="email" placeholder="Email"/>
        </div>
        <div>
          <label htmlFor="phone_number">Contact Phone Number</label>
          <Input {...register('phone_number')} name="phone_number" placeholder="Phone Number"/>
        </div>
        <div>
          <label htmlFor="address">Contact Address</label>
          <Input {...register('address')} name="address" placeholder="Address"/>
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
