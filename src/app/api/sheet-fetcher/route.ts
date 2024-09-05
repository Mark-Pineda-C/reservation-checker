import { SheetContextProps } from '@/context/sheet-provider';
import { google } from 'googleapis';

export const fetchCache = "force-no-store"

export async function GET() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({
    version: 'v4',
    auth: auth
  });

  try {

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'Respuestas de formulario 1'!C:N",
    })

    let data: SheetContextProps[] = [];


    response.data.values?.forEach((row, index) => {
      const [apartment, name, zone, date, startHour, endHour, totalTime, _, __, ___, ____, tower] = row;

      const _newDate = date.split("/");
      const newDate = `${_newDate[1]}/${_newDate[0]}/${_newDate[2]}`;

      if (index > 0) {
        data.push({
          apartment,
          name,
          zone,
          date: newDate,
          startHour,
          endHour,
          totalTime,
          tower
        });
      }
    })

    return Response.json(data);

  } catch (error) {
    console.log(error);
    return new Response('Error al obtener la data', { status: 500 });
  }

}