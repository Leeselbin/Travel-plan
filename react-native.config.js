module.exports = {
    resolver: {
        extraNodeModules: new Proxy(
            {},
            {
                get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
            },
        ),
    },
};
