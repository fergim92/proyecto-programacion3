// async function getData() {
//   const res = await fetch("http://localhost:3000/api/books", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// interface BookType {
//   ISBN: string;
//   anio_de_publicacion: number;
//   cantidad_disponible: number;
//   id_editorial: number;
//   id_idioma: number;
//   imagen_url: string;
//   titulo: string;
// }

const Books = async () => {
  // const data = await getData();
  // console.log(data);

  return (
    // <main>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexWrap: "wrap",
    //       justifyContent: "space-evenly",
    //     }}
    //   >
    //     {data?.map((book: BookType) => (
    //       <Card
    //         raised
    //         sx={{
    //           maxWidth: 180,
    //           margin: "15px",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //         key={book.ISBN}
    //       >
    //         <CardActionArea>
    //           <CardMedia
    //             component="img"
    //             sx={{ maxHeight: "280px" }}
    //             image={
    //               book.imagen_url
    //                 ? book.imagen_url
    //                 : "https://dummyimage.com/277x425/000/fff.jpg&text=Image+not+found"
    //             }
    //             title={book.titulo}
    //             alt={book.titulo}
    //           />
    //           <CardContent>
    //             <Typography gutterBottom component="div">
    //               {book.titulo}
    //             </Typography>
    //             <Typography gutterBottom component="div">
    //               {book.anio_de_publicacion}
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //         {/* <CardActions>
    //           <Link href={"/books"}>
    //             <Button size="small" color="primary">
    //               Detalle
    //             </Button>
    //           </Link>
    //           <Link href={"/books"}>
    //             <Button size="small" color="primary">
    //               Comprar
    //             </Button>
    //           </Link>
    //         </CardActions> */}
    //       </Card>
    //     ))}
    //   </Box>
    // </main>
    <></>
  );
};

export default Books;
