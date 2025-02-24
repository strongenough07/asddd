import { getSerial }  from '~~/server/db/serials';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
      const serial = await getSerial(query.slug);

      if (!serial) {
        return { serial: null };
      }
  
      return { serial };
    } catch (error) {
      console.error(error);
      throw createError({ statusCode: 500, statusMessage: 'Could not get serial' });
    } 
  });