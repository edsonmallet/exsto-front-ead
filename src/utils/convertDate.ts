import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const formatDate = (date: any, withHour = true) => {
  if (date)
    return withHour
      ? format(parseISO(String(date).slice(0, 19)), "dd/MM/yyyy HH:mm:ss", {
          locale: ptBR,
        })
      : format(parseISO(String(date).slice(0, 19)), "dd/MM/yyyy", {
          locale: ptBR,
        });
};

export const formatDateToField = (date: any) => {
  return format(parseISO(String(date).slice(0, 19)), "yyyy-MM-dd'T'HH:mm", {
    locale: ptBR,
  });
};

export const formatDatetoISO = (date: string | Date): Date => {
  const d = new Date(date);

  let iso = d.getFullYear().toString() + "-";
  iso += (d.getMonth() + 1).toString().padStart(2, "0") + "-";
  iso += d.getDate().toString().padStart(2, "0") + "T";
  iso += d.getHours().toString().padStart(2, "0") + ":";
  iso += d.getMinutes().toString().padStart(2, "0") + ":";
  iso += d.getSeconds().toString().padStart(2, "0");
  return iso as unknown as Date;
};
