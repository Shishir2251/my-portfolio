const DEFAULT_RESUME_URL = "https://drive.google.com/file/d/1LEon_FIuO_QzKh8R733l5zgV-hdApr3x/view?usp=sharing";

export function getResumeHref(url: string) {
  const value = url.trim();

  if (!value || value === "/resume.pdf") {
    return DEFAULT_RESUME_URL;
  }

  try {
    const parsed = new URL(value);

    if (parsed.hostname.includes("drive.google.com")) {
      const fileIdFromPath = parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1];
      const fileIdFromQuery = parsed.searchParams.get("id");
      const fileId = fileIdFromPath ?? fileIdFromQuery;

      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
      }
    }

    return parsed.toString();
  } catch {
    if (value.startsWith("/")) {
      return DEFAULT_RESUME_URL;
    }

    return `https://${value}`;
  }
}
