import {
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { Logo } from "../components/Logo";
import { register } from "../services/login";
import { useLoadingStore, useToastStore } from "../stores";
import { navigateTo } from "../utils/navigateTo";
import InputMask from "react-input-mask";
import api from "../services/api";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Register() {
  const { showToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();

  const [loadedByCupom, setLoadedByCupom] = React.useState(false);
  const [cupom, setCupom] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [companyList, setCompanyList] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    whatsapp: "",
    document: "",
    terms: true,
    companyId: "",
    position: "",
    courses: [],
    state: "",
    city: "",
    learningTrails: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(setLoading, showToast, values);
      const res = await signIn("credentials", {
        identifier: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/home",
      });

      if (res?.url) navigateTo(res?.url);

      if (res?.error) showToast("error", "Usuário ou senha inválidos.");
    } catch (err) {
      showToast("error", "Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCupom = async (value: string) => {
    if (value) {
      setLoading(true);
      try {
        let endpoint = `/cupoms`;
        endpoint += `?filters[cupom][$eq]=${value}`;
        endpoint += `&filters[status][$eq]=true`;
        endpoint += `&populate[company]=*`;
        endpoint += `&populate[courses]=*`;
        endpoint += `&populate[learningTrails]=*`;

        const cupom = await api.get(endpoint);

        if (!cupom?.data || cupom?.data.length === 0) {
          showToast("error", "Cupom inexiste ou inválido!");
          return;
        }
        setValues({
          ...values,
          companyId: cupom?.data?.data[0]?.attributes?.company?.data?.id,
          courses: cupom?.data?.data[0]?.attributes?.courses?.data?.map(
            (item: any) => item?.id
          ),
          learningTrails:
            cupom?.data?.data[0]?.attributes?.learningTrails?.data?.map(
              (item: any) => item?.id
            ),
          email: cupom?.data?.data[0]?.attributes?.email,
        });
        setCompany(
          cupom?.data?.data[0]?.attributes?.company?.data?.attributes?.name
        );
        setLoadedByCupom(true);
      } catch (error) {
        showToast("error", "Cupom inexiste ou inválido!");
      } finally {
        setLoading(false);
      }
    } else {
      setLoadedByCupom(false);
      setValues({
        username: "",
        password: "",
        email: "",
        whatsapp: "",
        document: "",
        terms: true,
        companyId: "",
        position: "",
        courses: [],
        state: "",
        city: "",
        learningTrails: [],
      });
    }
  };

  const getStates = React.useCallback(async () => {
    let endpoint = `/companies`;
    const companies = await api.get(endpoint);
    setCompanyList(companies.data.data);
  }, []);

  const getCompanies = React.useCallback(async () => {
    const states = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    );
    const uf = states?.data.map((item: any) => item?.sigla);
    setStates(uf);
  }, []);

  const getCityByState = React.useCallback(async (state: string) => {
    const cities = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos?orderBy=nome`
    );
    const list = cities?.data.map((item: any) => item?.nome);
    setCities(list);
  }, []);

  React.useEffect(() => {
    getStates();
    getCompanies();
  }, [getCompanies, getStates]);

  return (
    <Flex
      direction={"column"}
      justifyItems="center"
      alignItems="center"
      w="full"
      bgGradient="linear(to-b, gray.900, gray.700)"
      backgroundImage={"url(/homebg.webp)"}
      backgroundRepeat="no-repeat"
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      color="gray.50"
      h="100vh"
      overflowY={"auto"}
      p={8}
      css={{
        "&::-webkit-scrollbar": {
          background: "#BDD02F30",
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#BDD02F30",
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#BDD02F",
          borderRadius: "8px",
        },
      }}
    >
      <HStack w="full" maxW="container.lg" spacing="16">
        <VStack w="full" align="flex-start" spacing="8">
          <Logo />
          <Text
            fontSize="5xl"
            fontWeight="bold"
            lineHeight={1.15}
            textTransform="uppercase"
          >
            Comece agora sua jornada 4.0.
          </Text>
          <Text fontSize="2xl" fontWeight={"hairline"}>
            Aprenda tudo sobre a plataforma didática revolucionaria SMART 4.0 e
            suas tecnologias.
          </Text>
          <Image src="/smart40.svg" alt="Smart 4.0" width={300} />
        </VStack>

        <VStack
          w="full"
          maxW="450px"
          bgColor="#ffffff20"
          borderRadius="lg"
          p={12}
          my={8}
          spacing={8}
          align="flex-end"
        >
          <Text fontWeight="bold" fontSize="lg">
            Preencha os dados e prepare-se para alavancar sua carreira
          </Text>
          <form onSubmit={(e) => handleSubmit(e)}>
            <VStack w="full" gap={2}>
              <HStack w="full">
                <Input
                  border="1px"
                  borderColor="#B3C52D"
                  bg="gray.800"
                  placeholder="Digite seu Cupom"
                  type="text"
                  name="cupom"
                  onChange={(e) => setCupom(e.target.value)}
                />
                <IconButton
                  aria-label="Search database"
                  colorScheme={"green"}
                  onClick={() => handleChangeCupom(cupom)}
                  icon={<MagnifyingGlass fontSize={20} weight="bold" />}
                  isLoading={isLoading}
                />
              </HStack>

              <Stack w="full" alignItems={"center"} pt={8}>
                <Divider w="full" />
                <Text
                  position="relative"
                  top={-7}
                  bg="whiteAlpha.800"
                  borderRadius={"full"}
                  p={2}
                  color="black"
                  fontSize={"small"}
                >
                  Ou
                </Text>
              </Stack>

              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="Nome"
                type="text"
                name="username"
                onChange={(e) => handleChange(e)}
              />

              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="E-mail"
                type="email"
                name="email"
                isDisabled={loadedByCupom}
                value={values.email}
                onChange={(e) => handleChange(e)}
              />

              <Select
                placeholder="Empresa"
                _placeholder={{ color: "gray.900" }}
                name="companyId"
                iconColor="#B3C52D"
                onChange={(e) => handleChange(e)}
                border="1px"
                value={values.companyId}
                borderColor="#B3C52D"
                bg="gray.900"
              >
                {companyList.map((company: any) => (
                  <option
                    key={company?.id}
                    value={company?.id}
                    style={{ color: "black" }}
                  >
                    {company?.attributes?.name}
                  </option>
                ))}
              </Select>

              <Input
                as={InputMask}
                mask="(99) 9 9999-9999"
                maskChar={null}
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="Whatsapp"
                type="text"
                value={values.whatsapp}
                name="whatsapp"
                onChange={(e) => handleChange(e)}
              />

              <Input
                as={InputMask}
                mask="999.999.999-99"
                maskChar={null}
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="CPF"
                type="text"
                value={values.document}
                name="document"
                onChange={(e) => handleChange(e)}
              />

              <Select
                placeholder="Cargo"
                _placeholder={{ color: "gray.900" }}
                name="position"
                iconColor="#B3C52D"
                onChange={(e) => handleChange(e)}
                border="1px"
                value={values.position}
                borderColor="#B3C52D"
                bg="gray.900"
              >
                <option value="Diretor" style={{ color: "black" }}>
                  Diretor
                </option>
                <option value="Professor" style={{ color: "black" }}>
                  Professor
                </option>
                <option value="Coordernador" style={{ color: "black" }}>
                  Coordernador
                </option>
                <option value="Aluno" style={{ color: "black" }}>
                  Aluno
                </option>
                <option value="Outro" style={{ color: "black" }}>
                  Outro
                </option>
              </Select>

              <Select
                placeholder="Estado"
                _placeholder={{ color: "gray.900" }}
                name="state"
                iconColor="#B3C52D"
                onChange={(e) => {
                  handleChange(e);
                  getCityByState(e.target.value);
                }}
                border="1px"
                value={values.state}
                borderColor="#B3C52D"
                bg="gray.900"
              >
                {states.map((uf) => (
                  <option
                    key={Math.random()}
                    value={uf}
                    style={{ color: "black" }}
                  >
                    {uf}
                  </option>
                ))}
              </Select>

              <Select
                placeholder="Cidade"
                _placeholder={{ color: "gray.900" }}
                name="city"
                iconColor="#B3C52D"
                onChange={(e) => handleChange(e)}
                border="1px"
                value={values.city}
                isDisabled={!values.state}
                borderColor="#B3C52D"
                bg="gray.900"
              >
                {cities.map((city) => (
                  <option
                    key={Math.random()}
                    value={city}
                    style={{ color: "black" }}
                  >
                    {city}
                  </option>
                ))}
              </Select>

              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                type="password"
                placeholder="Senha"
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e)}
              />

              <Checkbox
                colorScheme="green"
                defaultChecked={values.terms}
                size="lg"
                name="terms"
                onChange={(e) =>
                  setValues((old) => ({ ...old, [e.target.name]: !old.terms }))
                }
              >
                <Text fontSize={"small"} fontWeight="hairline">
                  Ao informar seus dados e seguir para a próxima etapa. Você
                  automaticamente concorda com nossa Política de Privacidade.
                </Text>
              </Checkbox>
            </VStack>
            <Button
              mt={4}
              w="full"
              type="submit"
              colorScheme="green"
              isDisabled={isLoading || !values.terms}
              isLoading={isLoading}
              loadingText="Cadastrando..."
            >
              Cadastrar
            </Button>
          </form>
          <Button
            onClick={() => navigateTo("/")}
            colorScheme="green"
            variant={"link"}
            w="full"
            leftIcon={<ArrowLeft />}
            size="sm"
          >
            Voltar para login
          </Button>
        </VStack>
      </HStack>
    </Flex>
  );
}
