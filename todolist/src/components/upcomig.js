import { Button, Toast, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Editmodal from "./editmodal";

function Upcoming(Props) {
  const [data, setData] = useState([]);
  const [s, setS] = useState([]);
  const [id, setID] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const [rend, setRend] = useState(false);

  const rendr = (x) => {
    // setData(Props.senddata);
    axios.get(`http://localhost:8080/showupcoming`).then((res) => {
      setData(res.data);
      // setS([...s, 1]);
      // handleClose();
    });
  };

  useEffect(() => {
    rendr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rend, s]);

  const deletID = (e) => {
    axios.delete(`http://localhost:8080/delete/${e}`).then((res) => {
      setS([...s, 1]);
    });
  };

  const changeStatus = (e, i) => {
    axios.post(`http://localhost:8080/updatestatus/${i}/${e}`).then((res) => {
      // setRend(false);
      // Props.childrender(false);
      setS([...s, 1]);
      handleClose();
    });
  };

  return (
    <div>
      {data.map((item) => {
        return (
          <Toast key={item.id} id="toast">
            <Toast.Body id="toastbody">{item.task}</Toast.Body>
            <div id="buttons">
              <Button
                id="update"
                onClick={(e) => {
                  setID(item.id);
                  console.log("clicked");
                  handleShow();
                }}
                variant="success"
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </Button>
              <Button
                id="delet"
                onClick={(e) => {
                  deletID(item.id);
                }}
                variant="danger"
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
              <div id="status">
                <Dropdown className="d-inline mx-2">
                  <Dropdown.Toggle id="dropdown-autoclose-true">
                    {item.status}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      name="Upcoming"
                      id={item.id}
                      onClick={(e) => {
                        changeStatus(e.target.name, e.target.id);
                      }}
                    >
                      Upcoming
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="Ongoing"
                      id={item.id}
                      onClick={(e) => {
                        changeStatus(e.target.name, e.target.id);
                      }}
                    >
                      Ongoing
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="Completed"
                      id={item.id}
                      onClick={(e) => {
                        changeStatus(e.target.name, e.target.id);
                      }}
                    >
                      Completed
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Toast>
        );
      })}
      <Editmodal show={show} editid={id} rendr={rendr}></Editmodal>
    </div>
  );
}

export default Upcoming;
