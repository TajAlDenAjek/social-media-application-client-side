const PublicFiles = import.meta.env.VITE_REACT_API_KEY + '/api/public/images/'

export const fetchImage = async (fileName: string, setNewState: React.Dispatch<React.SetStateAction<string>>, token: string) => {
    const res = await fetch(`${PublicFiles}${fileName}`, {
        credentials: "same-origin", //send cookeis
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },                          // send token
    });

    //basic method for analyzing the shape features of an object,
    const imageBlob = await res.blob();
    // retrive the url of the current image
    const imageObjectURL = URL.createObjectURL(imageBlob);
    // set the new state of the image to display 
    setNewState(imageObjectURL)
    // setImg(imageObjectURL);
};