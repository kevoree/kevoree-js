/*
 * Generated by the Waxeye Parser Generator - version 0.8.0
 * www.waxeye.org
 */

var waxeye = waxeye;
if (typeof module !== 'undefined') {
    // require from module system
    waxeye = require('./waxeye');
}

var Parser = (function() {

    var parser = function() { return this; };
    parser.prototype = new waxeye.WaxeyeParser(0, true, [new waxeye.FA("kevScript", [new waxeye.State([new waxeye.Edge(42, 1, false)], false),
            new waxeye.State([new waxeye.Edge(1, 2, false),
                new waxeye.Edge(40, 6, true)], false),
            new waxeye.State([new waxeye.Edge(42, 3, false)], false),
            new waxeye.State([new waxeye.Edge(1, 4, false),
                new waxeye.Edge(40, 5, true)], true),
            new waxeye.State([new waxeye.Edge(42, 3, false)], false),
            new waxeye.State([new waxeye.Edge(41, 4, false)], true),
            new waxeye.State([new waxeye.Edge(41, 2, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("statement", [new waxeye.State([new waxeye.Edge(2, 1, false),
                new waxeye.Edge(3, 1, false),
                new waxeye.Edge(4, 1, false),
                new waxeye.Edge(5, 1, false),
                new waxeye.Edge(6, 1, false),
                new waxeye.Edge(7, 1, false),
                new waxeye.Edge(9, 1, false),
                new waxeye.Edge(10, 1, false),
                new waxeye.Edge(12, 1, false),
                new waxeye.Edge(8, 1, false),
                new waxeye.Edge(11, 1, false),
                new waxeye.Edge(15, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("add", [new waxeye.State([new waxeye.Edge(30, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(13, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(":", 5, true)], false),
            new waxeye.State([new waxeye.Edge(42, 6, false)], false),
            new waxeye.State([new waxeye.Edge(14, 7, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("remove", [new waxeye.State([new waxeye.Edge(31, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(13, 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("move", [new waxeye.State([new waxeye.Edge(32, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(13, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(16, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("attach", [new waxeye.State([new waxeye.Edge(34, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(13, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(16, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("detach", [new waxeye.State([new waxeye.Edge(35, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(13, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(16, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("set", [new waxeye.State([new waxeye.Edge(33, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(16, 3, false)], false),
            new waxeye.State([new waxeye.Edge("/", 4, true),
                new waxeye.Edge(42, 6, false)], false),
            new waxeye.State([new waxeye.Edge(16, 5, false)], false),
            new waxeye.State([new waxeye.Edge(42, 6, false)], false),
            new waxeye.State([new waxeye.Edge("=", 7, true)], false),
            new waxeye.State([new waxeye.Edge(42, 8, false)], false),
            new waxeye.State([new waxeye.Edge(22, 9, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("network", [new waxeye.State([new waxeye.Edge(36, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(16, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(19, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("addBinding", [new waxeye.State([new waxeye.Edge(37, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(16, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(16, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("delBinding", [new waxeye.State([new waxeye.Edge(38, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(16, 3, false)], false),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(16, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("addRepo", [new waxeye.State([new waxeye.Edge(28, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(26, 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("include", [new waxeye.State([new waxeye.Edge(29, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(18, 3, false)], false),
            new waxeye.State([new waxeye.Edge(":", 4, true)], false),
            new waxeye.State([new waxeye.Edge(19, 5, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("nameList", [new waxeye.State([new waxeye.Edge(16, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge([","], 3, true)], true),
            new waxeye.State([new waxeye.Edge(42, 4, false)], false),
            new waxeye.State([new waxeye.Edge(16, 2, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("typeDef", [new waxeye.State([new waxeye.Edge(18, 1, false)], false),
            new waxeye.State([new waxeye.Edge("/", 2, true)], true),
            new waxeye.State([new waxeye.Edge(20, 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("namespace", [new waxeye.State([new waxeye.Edge(39, 1, false)], false),
            new waxeye.State([new waxeye.Edge(42, 2, false)], false),
            new waxeye.State([new waxeye.Edge(18, 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("instancePath", [new waxeye.State([new waxeye.Edge(17, 1, false),
                new waxeye.Edge(18, 1, false)], false),
            new waxeye.State([new waxeye.Edge(["."], 2, true)], true),
            new waxeye.State([new waxeye.Edge(17, 1, false),
                new waxeye.Edge(18, 1, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("wildcard", [new waxeye.State([new waxeye.Edge("*", 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("string", [new waxeye.State([new waxeye.Edge(["-", [48, 57], [65, 90], "_", [97, 122]], 1, false)], false),
            new waxeye.State([new waxeye.Edge(["-", [48, 57], [65, 90], "_", [97, 122]], 1, false)], true)], waxeye.FA.LEFT),
        new waxeye.FA("string2", [new waxeye.State([new waxeye.Edge(["%", [45, 46], [48, 58], [64, 90], "_", [97, 122]], 1, false)], false),
            new waxeye.State([new waxeye.Edge(["%", [45, 46], [48, 58], [64, 90], "_", [97, 122]], 1, false)], true)], waxeye.FA.LEFT),
        new waxeye.FA("version", [new waxeye.State([new waxeye.Edge([[45, 46], [48, 57], [65, 90], "_", [97, 122]], 1, false)], false),
            new waxeye.State([new waxeye.Edge([[45, 46], [48, 57], [65, 90], "_", [97, 122]], 1, false)], true)], waxeye.FA.LEFT),
        new waxeye.FA("line", [new waxeye.State([new waxeye.Edge(44, 1, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 2, false)], false),
            new waxeye.State([new waxeye.Edge(43, 3, false)], true),
            new waxeye.State([new waxeye.Edge(-1, 2, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("realString", [new waxeye.State([new waxeye.Edge(["\'"], 1, true),
                new waxeye.Edge(["\""], 3, true)], false),
            new waxeye.State([new waxeye.Edge(27, 1, false),
                new waxeye.Edge(23, 1, false),
                new waxeye.Edge(24, 1, false),
                new waxeye.Edge(["\'"], 2, true)], false),
            new waxeye.State([], true),
            new waxeye.State([new waxeye.Edge(27, 3, false),
                new waxeye.Edge(23, 3, false),
                new waxeye.Edge(25, 3, false),
                new waxeye.Edge(["\""], 2, true)], false)], waxeye.FA.LEFT),
        new waxeye.FA("escaped", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([new waxeye.Edge(45, 2, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("singleQuoteLine", [new waxeye.State([new waxeye.Edge(51, 1, false)], false),
            new waxeye.State([new waxeye.Edge(50, 2, false)], false),
            new waxeye.State([new waxeye.Edge(49, 3, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 4, false)], false),
            new waxeye.State([new waxeye.Edge(48, 5, false)], true),
            new waxeye.State([new waxeye.Edge(47, 6, false)], false),
            new waxeye.State([new waxeye.Edge(46, 7, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 4, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("doubleQuoteLine", [new waxeye.State([new waxeye.Edge(57, 1, false)], false),
            new waxeye.State([new waxeye.Edge(56, 2, false)], false),
            new waxeye.State([new waxeye.Edge(55, 3, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 4, false)], false),
            new waxeye.State([new waxeye.Edge(54, 5, false)], true),
            new waxeye.State([new waxeye.Edge(53, 6, false)], false),
            new waxeye.State([new waxeye.Edge(52, 7, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 4, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("realStringNoNewLine", [new waxeye.State([new waxeye.Edge(["\'"], 1, true),
                new waxeye.Edge(["\""], 8, true)], false),
            new waxeye.State([new waxeye.Edge(["\\"], 2, false),
                new waxeye.Edge(61, 4, false),
                new waxeye.Edge(["\'"], 7, true)], false),
            new waxeye.State([new waxeye.Edge(58, 3, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 1, false)], false),
            new waxeye.State([new waxeye.Edge(60, 5, false)], false),
            new waxeye.State([new waxeye.Edge(59, 6, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 1, false)], false),
            new waxeye.State([], true),
            new waxeye.State([new waxeye.Edge(["\\"], 9, false),
                new waxeye.Edge(65, 11, false),
                new waxeye.Edge(["\""], 7, true)], false),
            new waxeye.State([new waxeye.Edge(62, 10, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 8, false)], false),
            new waxeye.State([new waxeye.Edge(64, 12, false)], false),
            new waxeye.State([new waxeye.Edge(63, 13, false)], false),
            new waxeye.State([new waxeye.Edge(-1, 8, false)], false)], waxeye.FA.LEFT),
        new waxeye.FA("newLine", [new waxeye.State([new waxeye.Edge("\r", 1, true),
                new waxeye.Edge("\n", 2, true),
                new waxeye.Edge("\r", 2, true)], false),
            new waxeye.State([new waxeye.Edge("\n", 2, true)], false),
            new waxeye.State([], true)], waxeye.FA.LEFT),
        new waxeye.FA("repoToken", [new waxeye.State([new waxeye.Edge("r", 1, false)], false),
            new waxeye.State([new waxeye.Edge("e", 2, false)], false),
            new waxeye.State([new waxeye.Edge("p", 3, false)], false),
            new waxeye.State([new waxeye.Edge("o", 4, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("includeToken", [new waxeye.State([new waxeye.Edge("i", 1, false)], false),
            new waxeye.State([new waxeye.Edge("n", 2, false)], false),
            new waxeye.State([new waxeye.Edge("c", 3, false)], false),
            new waxeye.State([new waxeye.Edge("l", 4, false)], false),
            new waxeye.State([new waxeye.Edge("u", 5, false)], false),
            new waxeye.State([new waxeye.Edge("d", 6, false)], false),
            new waxeye.State([new waxeye.Edge("e", 7, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("addToken", [new waxeye.State([new waxeye.Edge("a", 1, false)], false),
            new waxeye.State([new waxeye.Edge("d", 2, false)], false),
            new waxeye.State([new waxeye.Edge("d", 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("removeToken", [new waxeye.State([new waxeye.Edge("r", 1, false)], false),
            new waxeye.State([new waxeye.Edge("e", 2, false)], false),
            new waxeye.State([new waxeye.Edge("m", 3, false)], false),
            new waxeye.State([new waxeye.Edge("o", 4, false)], false),
            new waxeye.State([new waxeye.Edge("v", 5, false)], false),
            new waxeye.State([new waxeye.Edge("e", 6, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("moveToken", [new waxeye.State([new waxeye.Edge("m", 1, false)], false),
            new waxeye.State([new waxeye.Edge("o", 2, false)], false),
            new waxeye.State([new waxeye.Edge("v", 3, false)], false),
            new waxeye.State([new waxeye.Edge("e", 4, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("setToken", [new waxeye.State([new waxeye.Edge("s", 1, false)], false),
            new waxeye.State([new waxeye.Edge("e", 2, false)], false),
            new waxeye.State([new waxeye.Edge("t", 3, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("attachToken", [new waxeye.State([new waxeye.Edge("a", 1, false)], false),
            new waxeye.State([new waxeye.Edge("t", 2, false)], false),
            new waxeye.State([new waxeye.Edge("t", 3, false)], false),
            new waxeye.State([new waxeye.Edge("a", 4, false)], false),
            new waxeye.State([new waxeye.Edge("c", 5, false)], false),
            new waxeye.State([new waxeye.Edge("h", 6, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("detachToken", [new waxeye.State([new waxeye.Edge("d", 1, false)], false),
            new waxeye.State([new waxeye.Edge("e", 2, false)], false),
            new waxeye.State([new waxeye.Edge("t", 3, false)], false),
            new waxeye.State([new waxeye.Edge("a", 4, false)], false),
            new waxeye.State([new waxeye.Edge("c", 5, false)], false),
            new waxeye.State([new waxeye.Edge("h", 6, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("networkToken", [new waxeye.State([new waxeye.Edge("n", 1, false)], false),
            new waxeye.State([new waxeye.Edge("e", 2, false)], false),
            new waxeye.State([new waxeye.Edge("t", 3, false)], false),
            new waxeye.State([new waxeye.Edge("w", 4, false)], false),
            new waxeye.State([new waxeye.Edge("o", 5, false)], false),
            new waxeye.State([new waxeye.Edge("r", 6, false)], false),
            new waxeye.State([new waxeye.Edge("k", 7, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("bindToken", [new waxeye.State([new waxeye.Edge("b", 1, false)], false),
            new waxeye.State([new waxeye.Edge("i", 2, false)], false),
            new waxeye.State([new waxeye.Edge("n", 3, false)], false),
            new waxeye.State([new waxeye.Edge("d", 4, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("unbindToken", [new waxeye.State([new waxeye.Edge("u", 1, false)], false),
            new waxeye.State([new waxeye.Edge("n", 2, false)], false),
            new waxeye.State([new waxeye.Edge("b", 3, false)], false),
            new waxeye.State([new waxeye.Edge("i", 4, false)], false),
            new waxeye.State([new waxeye.Edge("n", 5, false)], false),
            new waxeye.State([new waxeye.Edge("d", 6, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("namespaceToken", [new waxeye.State([new waxeye.Edge("n", 1, false)], false),
            new waxeye.State([new waxeye.Edge("a", 2, false)], false),
            new waxeye.State([new waxeye.Edge("m", 3, false)], false),
            new waxeye.State([new waxeye.Edge("e", 4, false)], false),
            new waxeye.State([new waxeye.Edge("s", 5, false)], false),
            new waxeye.State([new waxeye.Edge("p", 6, false)], false),
            new waxeye.State([new waxeye.Edge("a", 7, false)], false),
            new waxeye.State([new waxeye.Edge("c", 8, false)], false),
            new waxeye.State([new waxeye.Edge("e", 9, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("comment", [new waxeye.State([new waxeye.Edge("/", 1, false)], false),
            new waxeye.State([new waxeye.Edge("/", 2, false)], false),
            new waxeye.State([new waxeye.Edge(21, 3, false)], true),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("eol", [new waxeye.State([new waxeye.Edge("\r", 1, false),
                new waxeye.Edge("\n", 2, false),
                new waxeye.Edge("\r", 2, false)], false),
            new waxeye.State([new waxeye.Edge("\n", 2, false)], false),
            new waxeye.State([], true)], waxeye.FA.VOID),
        new waxeye.FA("ws", [new waxeye.State([new waxeye.Edge(["\t", " "], 0, false),
                new waxeye.Edge(41, 0, false)], true)], waxeye.FA.VOID),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\'"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\'"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\""], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\""], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\'"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(41, 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\\"], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG),
        new waxeye.FA("", [new waxeye.State([new waxeye.Edge(["\""], 1, false)], false),
            new waxeye.State([], true)], waxeye.FA.NEG)]);
    return parser;
 
})();

// Add to module system
if (typeof module !== 'undefined') {
    module.exports.Parser = Parser;
}
