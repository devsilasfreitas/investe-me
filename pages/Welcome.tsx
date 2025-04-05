import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "../components/ScreenContainer";
import { useUser } from "../contexts/UserContext";
import { Props } from "../Route";

export function Welcome() {
  const [name, setName] = useState<string>("");

  const { saveName } = useUser();
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Investe Me!</Text>
        <Text style={styles.subtitle}>
          Para começar, como podemos chamar você?
        </Text>
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor={"#ccc"}
          style={styles.input}
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (name.length < 2) {
              alert("Digite um nome válido");
              return;
            }
            saveName(name);
          }}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
    textAlign: "center",
  },
  input: {
    borderColor: "#6495ED",
    borderBottomWidth: 3,
    width: "90%",
    fontSize: 18,
    borderRadius: 10,
    padding: 10,
    color: "white",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "90%",
  },
  buttonText: {
    color: "#6495ED",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  }
});