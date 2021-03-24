import Position from "./position.js";

const dfs = (mine, position, mineTracking, rightFlag, rightUpFlag, rightDownFlag, path, paths) => {
    if (!position.isValid(mine)) {
        paths.push(path);
        return;
    }
    else {

        let rightPos = new Position(position.x + 1, position.y);
        let rightUpPos = new Position(position.x + 1, position.y - 1);
        let rightDownPos = new Position(position.x + 1, position.y + 1);
        
        if (rightPos.isValid(mine) && rightFlag) {
            mineTracking[rightPos.y][rightPos.x].add(position.toString());
            dfs(mine, rightPos, mineTracking, false, true, true, path, paths);
        }
        if (rightUpPos.isValid(mine) && rightUpFlag) {
            mineTracking[rightUpPos.y][rightUpPos.x].add(position.toString());
            dfs(mine, rightUpPos, mineTracking, true, false, true, path, paths);
        }
        if (rightDownPos.isValid(mine) && rightDownFlag) {
            mineTracking[rightDownPos.y][rightDownPos.x].add(position.toString());
            dfs(mine, rightDownPos, mineTracking, true, true, false, path, paths);
        }

        //dfs(mine, rightPos, mineTracking, false, true, true);
        //dfs(mine, rightUpPos, mineTracking, true, false, true);
        //dfs(mine, rightDownPos, mineTracking, true, true, false);
    }
}


export default dfs;