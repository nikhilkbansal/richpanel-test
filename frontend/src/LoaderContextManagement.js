import React, { useState } from 'react'

export const LoaderContext = React.createContext({
    isLoading: false,
    setLoader: () => {}
})
