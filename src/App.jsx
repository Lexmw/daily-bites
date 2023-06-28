import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';

import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import RecipePage from './views/RecipePage';

export default function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home />,
      errorElement:<ErrorPage />
    },
    {
      path: "recipe/:recipeId",
      element: <RecipePage />,
    },
  ])

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}