import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

export default function PdfPage({ details }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(
      `${window.location.hostname}/qrcode?serial=${details.serial}`,
      {
        errorCorrectionLevel: "H",
      }
    )
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error(err));
  }, [details.serial]);

  Font.register({ family: "YekanBakh", src: "/Fonts/YekanBakh-VF.ttf" });

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      fontFamily: "YekanBakh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
      fontSize: 16,
      fontWeight: "extrabold",
    },
    section: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      marginBottom: 10,
    },
    label: {
      fontWeight: "bold",
    },
    support: {
      marginTop: 20,
    },
    qrCode: {
      marginTop: 10,
      alignSelf: "center",
      height: "100px",
      width: "100px",
    },
    footerLogos: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    logo: {
      marginHorizontal: 10,
      width: 50,
      height: 20,
    },
  });

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Text style={styles.header}>
          از اینکه محصول خود را ثبت کردید متشکریم
        </Text>

        <View style={styles.section}>
          <Text>{details.serial}</Text>
          <Text style={styles.label}>:شماره سریال</Text>
        </View>

        <View style={styles.section}>
          <Text>{details.time}</Text>
          <Text style={styles.label}>:تاریخ ثبت نام</Text>
        </View>

        <View style={styles.section}>
          <Text>{details.carType}</Text>
          <Text style={styles.label}>:نوع خودرو</Text>
        </View>

        <View style={styles.section}>
          <Text>{details.engineId}</Text>
          <Text style={styles.label}>:شماره موتور</Text>
        </View>

        <View style={styles.section}>
          <Text>{details.km}</Text>
          <Text style={styles.label}>:کیلومتر اولیه</Text>
        </View>

        <View style={styles.section}>
          <Text>02144598476 - 09120708177</Text>
          <Text style={styles.label}>:پشتیبانی</Text>
        </View>

        {qrCodeUrl && <Image style={styles.qrCode} src={qrCodeUrl} />}

        <View style={styles.footerLogos}>
          <Image style={styles.logo} src="/logo1.jpg" />
          <Image style={styles.logo} src="/logo2.PNG" />
          <Image style={styles.logo} src="/logo3.jpg" />
        </View>
      </Page>
    </Document>
  );
}
