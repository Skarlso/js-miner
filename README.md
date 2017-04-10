# Miner

![Logo](./logo.png)

Miner is a CLI utility to manage multiple Minecraft servers with simple commands and Docker Containers to keep them isolated.

Further more it provides the ability to backup any world to a configured S3 bucket.

Simple commands are `attach`, `create`, `start`, `stop`, `backup`.

In the works: `list`, `status`.

Also provides versions of Minecraft with `Bukkit` and pre-configured environment through created Docker Images which are
tagged according to the version they provide.

Thus, it's easy to get a server, which uses mods like the ever famous `/home` teleporter
[MyHome](https://mods.curse.com/bukkit-plugins/minecraft/myhome).

# Usage

Miner aims to be used as a lightweight server manager. It does that with Docker Containers in order to isolate running servers.
The containers expose port `25655`. The words are located on the local machine though and mounted into the container via Volumes.
This is so, that after a world is created, it will remain and `Plugins` or `Modules` can be used with the world. Once it starts
again the modules will be enabled.

This tool also provides the option to backup a World to a configured S3 bucket. The world is zipped and uploaded using local AWS
credentials located under the AWS CLI credentials file.

## Setup

### Configuration Options

## LifeCycle

## Commands

## Mods

Both, craftbukkit and forge are supported mods and come with the server pre-configured. For forge, the installed mod goes into the `mod` folder of the world for craftbukkit, it goes into the plugin folder. If the server is started with Forge mods, the mods need to be present on the client side as well.

Luckily, forge install is now very easy, and has a gui. You can install the client easily and just copy the ZIP file into your mod folder located under your minecraft install folder. For OSX this is: `/Users/user/Library/Application Support/minecraft/mods`.

To choose Forge mod, run a server like this:

```bash
MINER_MOD=forge js-miner start -n lucky_world
```

## Versions

Versions are built by me and hosted under [MineCraft Docker](https://hub.docker.com/r/skarlso/minecraft/). There are only two
versions currently, but once all the features are working properly, I'll build more. Forge is only provided on 1.11.2 right now.

As new versions will come out, I will update these containers to contain them as well.
