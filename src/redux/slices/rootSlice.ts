import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: 'root',
    initialState:{
        primary_name: 'Thanos',
        secret_identity: "n/a",
        aliuses: "Mad Titan, Chins, Masterlord",
        description: 'An eternal from Titan that is in love with Death',
        first_appearance: 'Iron Man #55',
        comics_appeared_in: 70,
        abilities: 'Energy Manipulation, Superhuman Strength, Imortality',
        original_creator: 'Jim Starlin',

    },
    reducers: {
        choosePrimaryName: (state, action) =>{ state.primary_name = action.payload},
        chooseOriginalCreator: (state, action) =>{ state.original_creator = action.payload},
        chooseDescription: (state, action) =>{ state.description = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const {choosePrimaryName, chooseOriginalCreator, chooseDescription} = rootSlice.actions;