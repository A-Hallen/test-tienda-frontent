/**
 * Inicia una transición de vista y devuelve una promesa que se resolverá una vez que se complete la transición.
 * @returns {Promise<object>} Una promesa que se resolverá con un objeto que contiene los métodos `resolve` y `reject`.
 */
export const beginViewTransition = async () => {
    // Obtiene una referencia al objeto document
    const doc = document;

    // Obtiene una referencia a la clase Promise
    const PromiseClass = Promise;

    // Crea un objeto resolver para almacenar las funciones de resolución y rechazo
    const resolver = {};

    // Obtiene una referencia al método startViewTransition de doc si está disponible
    const startViewTransition = doc.startViewTransition?.bind(doc);

    // Crea una nueva promesa
    const promise = new PromiseClass((resolve, reject) => {
        resolver.resolve = resolve;
        resolver.reject = reject;
    });

    // Si startViewTransition existe, ejecuta la transición de vista y espera a que se complete
    if (startViewTransition) {
        await new PromiseClass((resolve) => {
            startViewTransition(async () => {
                resolve();
                await promise;
            });
        });
    }

    // Devuelve el objeto resolver
    return resolver;
}