const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
        
      ],
      userToken: null
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      signUp: async (requestBody) => {
        const url = process.env.BACKEND_URL + "/api/user";
        const options = {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        };
        try {
          const resp = await fetch(url, options);
          if (resp.ok) {
            console.log("Success");
            return {success : true}
          } else {
            console.log("Error");
          }
        } catch (err) {
          console.error("Error fetching" + err.message);
        }
      },
      login: async (requestBody) =>{
        const url = process.env.BACKEND_URL + '/api/login'
        const options = {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
        try {
          const response = await fetch(url, options)
          if(response.ok){
            const data = await response.json()
            console.log(data.token)
            sessionStorage.setItem("Token", data.token)
            await setStore({userToken: data.token})
            return {success: true}
          }else{
            return {status: response.status}
          }
        } catch (error) {
          console.error("err " +  error)
          
        }
      
      }
    },
  };
};

export default getState;
