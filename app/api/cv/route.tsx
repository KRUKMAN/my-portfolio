import { Document, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { cvData, type TextSegment } from "@/app/consulting/cv-data";

export const runtime = "nodejs";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1c1917",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 18,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    fontSize: 12,
    marginTop: 4,
  },
  contact: {
    fontSize: 10,
    marginTop: 6,
    color: "#57534e",
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
    color: "#78716c",
  },
  paragraph: {
    marginTop: 6,
  },
  experienceItem: {
    marginBottom: 12,
  },
  role: {
    fontSize: 12,
    fontWeight: "bold",
  },
  period: {
    fontSize: 10,
    color: "#78716c",
  },
  company: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
    color: "#44403c",
  },
  description: {
    marginTop: 4,
  },
  tag: {
    fontSize: 8,
    color: "#78716c",
    marginRight: 6,
    marginBottom: 4,
  },
  stackItem: {
    fontSize: 9,
    borderWidth: 1,
    borderColor: "#1c1917",
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  educationItem: {
    marginTop: 8,
  },
});

function flattenSegments(segments: TextSegment[]) {
  return segments.map((segment) => segment.text).join("");
}

function CvDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{cvData.name}</Text>
          <Text style={styles.title}>{cvData.titleText}</Text>
          <Text style={styles.contact}>
            {cvData.location} | {cvData.phone} | {cvData.email}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{cvData.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {cvData.experience.map((item) => (
            <View key={`${item.company}-${item.role}-${item.period}`} style={styles.experienceItem}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <Text style={styles.role}>{item.role}</Text>
                <Text style={styles.period}>{item.period}</Text>
              </View>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
                {item.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>
                    #{tag}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Stack</Text>
          <Text>{cvData.stackIntro}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
            {cvData.stack.map((skill) => (
              <Text key={skill} style={styles.stackItem}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{cvData.background.heading}</Text>
          {cvData.background.paragraphs.map((segments, index) => (
            <Text key={`background-${index}`} style={styles.paragraph}>
              {flattenSegments(segments)}
            </Text>
          ))}
          <Text style={styles.paragraph}>{cvData.background.sidebar}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{cvData.education.heading}</Text>
          <Text>{cvData.education.intro}</Text>
          {cvData.education.items.map((item) => (
            <View key={`${item.degree}-${item.period}`} style={styles.educationItem}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <Text style={styles.role}>{item.degree}</Text>
                <Text style={styles.period}>{item.period}</Text>
              </View>
              <Text style={styles.company}>{item.institution}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export async function GET() {
  const buffer = await renderToBuffer(<CvDocument />);
  const body = new Uint8Array(buffer);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Jakub-Krukowski-CV.pdf"',
    },
  });
}
