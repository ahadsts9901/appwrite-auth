import { useEffect, useState } from "react"
import Form from "../components/Form"
import Logout from "../components/Logout"
import { databases } from "../appwrite";

const Home = () => {

  const [posts, setPosts]: any = useState([])
  const [isLoading, setIsLoading]: any = useState(false)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {

    setIsLoading(true)

    const promise = databases.listDocuments(
      '6607d9ea9c0f45a3bfbb', // database id
      '6607d9fbef5f51d4c2d2', // collection id
    )

    promise.then(function (resp: any) {
      setPosts(resp.documents)
    }, function (error: any) {
      console.log(error);
    });

    // setIsLoading(false)

  }

  return (
    <>
      <Logout />
      <Form />
      {
        isLoading ? <div className="screen"><span className="loader"></span></div> : ""
      }
    </>
  )
}

export default Home