export function getResumeHref(url: string) {
  const value = url.trim();

  if (!value) {
    return "/resume.pdf";
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
    return value.startsWith("/") ? value : `https://${value}`;
  }
}
