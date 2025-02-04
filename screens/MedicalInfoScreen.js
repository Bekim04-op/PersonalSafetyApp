// Add new screen MedicalInfoScreen.js
const MedicalInfoScreen = () => (
  <View style={styles.container}>
    <InfoCard title="Blood Type" value="A+"/>
    <InfoCard title="Allergies" value="Pollen, Penicillin"/>
    <InfoCard title="Emergency Contact" value="John Doe (+123456789)"/>
  </View>
);

const InfoCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);