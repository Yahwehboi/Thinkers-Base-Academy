import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.thinkersbaseacademy.com", changeFrequency: "weekly", priority: 1 },
    { url: "https://www.thinkersbaseacademy.com/about", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.thinkersbaseacademy.com/admissions", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.thinkersbaseacademy.com/school-life", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.thinkersbaseacademy.com/contact", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.thinkersbaseacademy.com/foundation-stage", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.thinkersbaseacademy.com/pre-school", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.thinkersbaseacademy.com/grade-school", changeFrequency: "monthly", priority: 0.7 },
  ];
}