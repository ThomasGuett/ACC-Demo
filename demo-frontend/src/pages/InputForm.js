import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";

const InputForm = (props) => {
  const navigate = useNavigate();
  const webhookUrl = process.env.REACT_APP_CAMUNDA_WEBHOOK // injected in Dockerfile

  let { query } = useParams();

  var pairs = query.split("&");
  var result = {};
  pairs.forEach(function (p) {
    var pair = p.split("=");
    var key = pair[0];
    var value = decodeURIComponent(pair[1] || "");
    value = value.replaceAll("+", " ");
    if (result[key]) {
      if (Object.prototype.toString.call(result[key]) === "[object Array]") {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });
  var jsonObject = JSON.parse(JSON.stringify(result));

  useEffect(() => {
    console.log(`/query/${query}`);
  }, []);

  function sendUpdate(formData) {
    console.log("on submit");
    const outstandingLoans = "on" == formData.get("outstandingLoans");
    const loansTaken = "on" == formData.get("loansTaken");
    const debt = "on" == formData.get("debt");
    const politicalExposed = "on" == formData.get("politicalExposed");
    const criminal = "on" == formData.get("criminal");
    const sanctioned = "on" == formData.get("sanctioned");
    const investigated = "on" == formData.get("investigated");

    var jsonData = {
      uniqueId: jsonObject.checkId,
      CreditRiskAssessment: {
        outstandingLoans: outstandingLoans,
        loansTaken: loansTaken,
        debt: debt
      },
      AMLCheck: {
        politicalExposed: politicalExposed,
        criminal: criminal,
        sanctioned: sanctioned,
        investigated: investigated
      }
    };

    fetch(
      webhookUrl,
      {
        method: "POST",
        //mode: "no-cors",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    navigate("/", { replace: true });
  }

  return (
    <form action={sendUpdate}>
      <Container sx={{ width: 850, alignItems: "center" }}>
        <Paper elevation={1} sx={{ marginTop: 5 }}>
          <Box
            sx={{
              "& > :not(style)": { m: 2, marginLeft: 4, marginRight: 4, width: "95ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControlLabel control={<Checkbox name="outstandingLoans" id="outstandingLoans" />} label="Do you currently have any outstanding loans or credit cards?" />
            <FormControlLabel control={<Checkbox name="loansTaken" id="loansTaken" />} label="Have you taken out any loans in the past 5 years?" />
            <FormControlLabel control={<Checkbox name="debt" id="debt" />} label="Do you have any history of bankruptcy, foreclosures, or legal judgments related to debt?" />
            <FormControlLabel control={<Checkbox name="politicalExposed" id="politicalExposed" />} label="Are you a politically exposed person (PEP), or do you have close ties to a PEP?" />
            <FormControlLabel control={<Checkbox name="criminal" id="criminal" />} label="Do you have any criminal convictions related to financial crimes or fraud?" />
            <FormControlLabel control={<Checkbox name="sanctioned" id="sanctioned" />} label="Do you have any connections to high-risk or sanctioned countries?" />
            <FormControlLabel control={<Checkbox name="investigated" id="investigated" />} label="Have you ever been investigated for money laundering, tax evasion, or financial fraud?" />
            <Button type="submit" variant="contained">
              submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </form>
  );
};
export default InputForm;
