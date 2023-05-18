import {
  Avatar,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { TitlePage } from "../components/TitlePage";
import api from "../services/api";
import InputMask from "react-input-mask";
import axios from "axios";
import { useToastStore } from "../stores";

export default function ProfilePage({ userData }: any) {
  const { data: session } = useSession();

  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { showToast } = useToastStore();

  const getStates = React.useCallback(async () => {
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

  const [user, setUser] = React.useState(userData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${user?.id}`, user, {
        headers: {
          Authorization: `Bearer ${(session as any).jwt}`,
        },
      });

      if (res?.status === 200) {
        showToast("success", "Perfil atualizado com sucesso.");
      }
    } catch (err) {
      showToast("error", `${err}`);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getStates();
    if (user?.state) getCityByState(user?.state);
  }, [getCityByState, getStates, user?.state]);

  const Profile = () => (
    <Flex
      my={10}
      w="full"
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <TitlePage title="Profile" />

      <Flex
        gap={8}
        w={{ base: "100%", md: "80%" }}
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
      >
        <Flex flex={1}>
          <Avatar size="2xl"></Avatar>
        </Flex>
        <Flex flex={4} direction="column" gap={4}>
          <Flex gap={4} w="full" direction={{ base: "column", md: "row" }}>
            <Input
              border="1px"
              borderColor="#B3C52D"
              bg="gray.100"
              placeholder="username"
              type="text"
              name="username"
              value={user?.username}
              onBlur={(e) => handleChange(e)}
            />
            <Input
              border="1px"
              borderColor="#B3C52D"
              bg="gray.100"
              placeholder="E-mail"
              type="email"
              name="email"
              defaultValue={user?.email}
              onBlur={(e) => handleChange(e)}
            />
          </Flex>
          <Flex gap={4} w="full" direction={{ base: "column", md: "row" }}>
            <Input
              as={InputMask}
              mask="999.999.999-99"
              border="1px"
              borderColor="#B3C52D"
              bg="gray.100"
              placeholder="CPF"
              type="text"
              name="document"
              defaultValue={user?.document}
              onBlur={(e) => handleChange(e)}
            />
            <Input
              as={InputMask}
              mask="(99) 9 9999-9999"
              border="1px"
              borderColor="#B3C52D"
              bg="gray.100"
              placeholder="Telefone"
              type="text"
              name="phone"
              defaultValue={user?.phone}
              onBlur={(e) => handleChange(e)}
            />
            <Input
              as={InputMask}
              mask="(99) 9 9999-9999"
              border="1px"
              borderColor="#B3C52D"
              bg="gray.100"
              placeholder="Whatsapp"
              type="text"
              name="wathsapp"
              defaultValue={user?.whatsapp}
              onBlur={(e) => handleChange(e)}
            />
          </Flex>
          <Flex gap={4} w="full" direction={{ base: "column", md: "row" }}>
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
              defaultValue={user?.state}
              borderColor="#B3C52D"
              bg="gray.100"
            >
              {states.map((uf) => (
                <option
                  key={Math.random()}
                  value={uf}
                  style={{ color: "black" }}
                  selected={user?.state === uf}
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
              defaultValue={user?.city}
              isDisabled={!user?.state}
              borderColor="#B3C52D"
              bg="gray.100"
            >
              {cities.map((city) => (
                <option
                  key={Math.random()}
                  value={city}
                  style={{ color: "black" }}
                  selected={user?.city === city}
                >
                  {city}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex gap={4} w="full" direction={{ base: "column", md: "row" }}>
            <Textarea
              rows={6}
              border="1px"
              borderColor="#B3C52D"
              bg="gray.100"
              placeholder="Digite sua Biografia"
              name="minibio"
              defaultValue={user?.minibio}
              onBlur={(e) => handleChange(e)}
            />
          </Flex>
          <Button
            isLoading={loading}
            isDisabled={loading}
            loadingText="Salvando..."
            colorScheme={"green"}
            onClick={() => handleSubmit()}
          >
            Salvar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Profile />} />;
}

export const getServerSideProps: GetServerSideProps<{
  userData: any;
  session: any;
}> = async (context) => {
  let headers = {};
  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
  }

  let endpoint = "/users/me";
  const me = await api.get(endpoint, {
    headers: headers,
  });

  return {
    props: {
      userData: me.data,
      session,
    },
  };
};
