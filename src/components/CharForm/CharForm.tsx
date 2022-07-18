import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { choosePrimaryName, chooseOriginalCreator, chooseDescription } from "../../redux/slices/rootSlice";
import { Input } from "../sharedComponents";
import { serverCalls } from "../../api";
import { useGetData } from "../../custom-hooks";

interface CharFormProps{
    id?:string;
    data?:{}
}

interface CharState{
    primaryName:string;
    originalCreator:string;
    description:string;
}

export const CharForm = (props:CharFormProps) =>{
    const dispatch = useDispatch();
    let { charData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<CharState>(state =>state.primaryName);
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data:any, event:any) =>{
        console.log(props.id)

        if(props.id!){
            await serverCalls.update(props.id!,data)
            console.log(`Updated drone id: ${props.id}`)
            window.location.reload();
            event.target.reset();
        }else{
            dispatch(choosePrimaryName(data.primaryName))
            dispatch(chooseOriginalCreator(data.originalCreator))
            dispatch(chooseDescription(data.description))
            await serverCalls.create(store.getState())
            window.location.reload();
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="primary_name">Primary Name</label>
                    <Input {...register('primary_name')} name='primary_name' placeholder='Spider-Man'/>
                </div>
                <div>
                    <label htmlFor="secret_identity">Secret Identity</label>
                    <Input {...register('secret_identity')} name='secret_identity' placeholder='Peter Parker'/>
                </div>
                <div>
                    <label htmlFor="aliuses">Aliuses</label>
                    <Input {...register('aliuses')} name='aliuses' placeholder='Webhead'/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name='description' placeholder='Friendly neighborhood superhero'/>
                </div>
                <div>
                    <label htmlFor="first_appearance">First Appearance</label>
                    <Input {...register('first_appearance')} name='first_appearance' placeholder='Amazing Fantasy #15'/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Number of Comics Appeared In</label>
                    <Input {...register('comics_appeared_in')} name='comics_appeared_in' placeholder='4567'/>
                </div>
                <div>
                    <label htmlFor="abilities">Abilities</label>
                    <Input {...register('abilities')} name='abilities' placeholder='spider sense, agility, strength'/>
                </div>
                <div>
                    <label htmlFor="original_creator">Original Creator</label>
                    <Input {...register('original_creator')} name='original_creator' placeholder='Stan Lee'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}