const {
    spawn
} = require('child_process')

let generate = (msg) => {
    return new Promise((resolve, reject) => {
        let success = 1;
        let server = spawn('python', ["server.py"])
        let client = spawn('python', ["client.py"])
        let out = []
        server.on('spawn', () => {
            console.log(`${server.pid} Server has spawned`);
        })
        client.on("spawn", () => {
            console.log(`${client.pid} Client has spawned`)
        })

        server.stdout.on('data', (data) => {
            let stdout = data.toString('utf-8')
            out.push(stdout)
        })

        server.on('close', (code) => {
            console.log(`Server(${server.pid}) exited with code: ${code}`)
            // return out
            resolve(out)
        })
        client.on('close', (code) => {
            console.log(`Client(${client.pid}) exited with code: ${code}`);
        })
        server.on('error', (err) => {
            reject(err)
        })
        client.on('error', (err) => {
            reject(err)
        })


        client.stdin.write(msg);
        client.stdin.end()
        server.stdin.end()
    })
}

module.exports = {
    generate
}