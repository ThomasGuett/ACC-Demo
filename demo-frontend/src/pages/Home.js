import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import robotImg from "../images/happy-robot.png";

const Home = () => (
    <div className="App">
    <Container sx={{
        marginY: 5
    }}
    >
        <Typography variant="h4" component="h2" marginTop={5} marginBottom={3}>submitted</Typography>
        <img src={robotImg} width={500} />
    </Container>
    </div>
);

export default Home;