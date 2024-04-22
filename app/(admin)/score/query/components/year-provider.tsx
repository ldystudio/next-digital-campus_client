"use client"

import React from "react"

import constate from "constate"

function useYearState({ initialYear = 2024 }) {
    const [year, setYear] = React.useState<number | string>(initialYear)
    return { year, setYear }
}

export const [YearProvider, useYear, useSetYear] = constate(
    useYearState,
    (value) => value.year,
    (value) => value.setYear
)
