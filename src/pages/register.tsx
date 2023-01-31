import {
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { ArrowLeft } from "phosphor-react";
import React from "react";
import { Logo } from "../components/Logo";
import { register } from "../services/login";
import { useLoadingStore, useToastStore } from "../stores";
import { navigateTo } from "../utils/navigateTo";
import InputMask from "react-input-mask";
import api from "../services/api";

export default function Register() {
  const { showToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();

  const [loadedByCupom, setLoadedByCupom] = React.useState(false);

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    whatsapp: "",
    document: "",
    terms: true,
    companyId: "",
    courses: [],
    learningTrails: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await register(setLoading, showToast, values);
    if (token) {
      Cookies.set("Exsto_token", token);
      navigateTo("/home");
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

        console.log(cupom.data.data);

        if (!cupom?.data || cupom?.data.length === 0) {
          showToast("error", "Cupom inexiste ou inválido!");
          return;
        }
        setLoadedByCupom(true);
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
        courses: [],
        learningTrails: [],
      });
    }
  };

  return (
    <VStack
      w="full"
      bgGradient="linear(to-b, gray.900, gray.700)"
      backgroundImage={"url(/homebg.webp)"}
      backgroundRepeat="no-repeat"
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      color="gray.50"
      minH="100vh"
      spacing="0"
      pt={32}
    >
      <HStack w="full" maxW="container.lg" minH="50vh" spacing="16">
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
          spacing={8}
          align="flex-end"
        >
          <Text fontWeight="bold" fontSize="lg">
            Preencha os dados e prepare-se para alavancar sua carreira
          </Text>
          <form onSubmit={(e) => handleSubmit(e)}>
            <VStack w="full" gap={2}>
              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="Digite seu Cupom"
                type="text"
                name="cupom"
                onBlur={(e) => handleChangeCupom(e.target.value)}
              />

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
              <Input
                as={InputMask}
                mask="(99) 9 9999-9999"
                maskChar={null}
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="Whatsapp"
                type="text"
                name="whatsapp"
                onChange={(e) => handleChange(e)}
              />
              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                type="password"
                placeholder="Senha"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <Checkbox
                colorScheme="green"
                defaultChecked={values.terms}
                size="lg"
                name="terms"
                onChange={(e) => handleChange(e)}
              >
                <Text fontSize={"small"} fontWeight="hairline">
                  Ao informar seus dados a seguir para a próxima etapa. Você
                  automaticamente con- corda com nossa Política de privacidade.
                </Text>
              </Checkbox>
            </VStack>
            <Button
              mt={4}
              w="full"
              type="submit"
              colorScheme="green"
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
    </VStack>
  );
}
