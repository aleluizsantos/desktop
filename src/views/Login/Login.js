import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import validate from "validate.js";

// reactstrap components
import {
  Form,
  FormGroup,
  Input,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  FormFeedback,
  FormText,
  Label,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";

import "./styles.css";
import { myOrders, signIn } from "../../store/Actions";
import { isAuthenticated } from "../../hooks";

const Login = (props) => {
  const [isloading, setIsloading] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.Message);
  const { fail_login } = useSelector((state) => state.Authenticate);

  // Validações do campos
  const schema = {
    email: {
      presence: { allowEmpty: false, message: "é obrigatório" },
      email: { email: true },
      length: {
        maximum: 128,
      },
    },
    password: {
      presence: { allowEmpty: false, message: "é obrigatório" },
      length: {
        maximum: 128,
      },
    },
  };

  // Caso o usuário já esteja conectado redirecionar para dashboard
  useEffect(() => {
    (() => {
      if (isAuthenticated()) history.push("/dashboard");
    })();
  }, [history]);

  // Efetuar login
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsloading(true);
    try {
      dispatch(signIn(formState.values.email, formState.values.password)).then(
        () => {
          dispatch(myOrders()).then((resp) => actionNewOrder(resp));
          history.push("/dashboard");
        }
      );
    } catch (error) {
      setIsloading(false);
      alert("erro");
    }
  };

  async function actionNewOrder(order) {
    if (order.length > 0) {
      // Disparar um janela para o usuário informando que existe pedido
      // o usuario deve escolher 0=IMPRIMIR | 1=ABRIR APLICAÇÃO | 2=IR PARA PAINEL PEDIDO
      const respDialog = await window.indexBridge.checkNewOrder(order);
      respDialog === 2 ? history.push("/myOrders") : history.push("/dashboard");
    } else {
      history.push("/dashboard");
    }
  }

  const handleChange = (event) => {
    event.persist();

    let dataForm = {
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    };

    const errors = validate(dataForm.values, schema);

    dataForm = {
      ...dataForm,
      isValid: errors ? false : true,
      errors: errors || {},
    };

    setFormState(dataForm);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div id="page-signin">
      <Row xs="1" sm="1" md="2">
        <Col className="signinImg" />
        <Col className="content">
          <span className="version">Version: 1.1.5</span>
          <Card className="contentCard">
            <CardHeader className="text-center">
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CardTitle tag="h4">Sign-In</CardTitle>
              <p className="card-category">
                Bem vindo ao sistema Picanha & Cia!!!
              </p>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleLogin}>
                <Col md="12">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      placeholder="e-mail"
                      name="email"
                      value={formState.values.email || ""}
                      onChange={handleChange}
                      type="text"
                      // valid={!hasError("email")}
                      invalid={hasError("email")}
                    />
                    <FormFeedback valid>E-mail válido.</FormFeedback>
                    <FormText>Informe seu e-mail email@email.com</FormText>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Senha</Label>
                    <Input
                      placeholder="Senha"
                      name="password"
                      type="password"
                      value={formState.values.password || ""}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>

                <hr />
                <div className="button-container">
                  <Button
                    type="submit"
                    color="danger"
                    block
                    disabled={!formState.isValid}
                  >
                    LOGIN
                    {isloading && !fail_login && (
                      <Spinner size="sm" color="light" />
                    )}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
