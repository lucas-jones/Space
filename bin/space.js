(function (console, $hx_exports, $global) { "use strict";
$hx_exports.milkshake = $hx_exports.milkshake || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Space = $hx_exports.Space = function() { };
Space.__name__ = ["Space"];
Space.main = function() {
	var milkshake1 = milkshake_Milkshake.boot(new milkshake_Settings(milkshake_utils_Globals.SCREEN_WIDTH,milkshake_utils_Globals.SCREEN_HEIGHT));
	milkshake1.scenes.addScene(new scenes_TestScene());
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_TypeTools = function() { };
haxe_TypeTools.__name__ = ["haxe","TypeTools"];
haxe_TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass;
	if(js_Boot.__instanceof(value,Class)) valueClass = value; else valueClass = Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,__class__: haxe_ds_StringMap
};
var haxe_exception_Exception = function(message,innerException,numberOfStackTraceShifts) {
	if(null == message) this.message = "Unknown exception"; else this.message = message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
haxe_exception_Exception.__name__ = ["haxe","exception","Exception"];
haxe_exception_Exception.prototype = {
	generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe_CallStack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = js_Boot.getClass(this);
		while(haxe_exception_Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,get_baseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,toString: function() {
		return this.message + haxe_CallStack.toString(this.stackTraceArray);
	}
	,__class__: haxe_exception_Exception
	,__properties__: {get_baseException:"get_baseException"}
};
var haxe_exception_ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	haxe_exception_Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
haxe_exception_ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe_exception_ArgumentNullException.__super__ = haxe_exception_Exception;
haxe_exception_ArgumentNullException.prototype = $extend(haxe_exception_Exception.prototype,{
	__class__: haxe_exception_ArgumentNullException
});
var hsl_haxe_Bond = function() {
	this.halted = false;
};
hsl_haxe_Bond.__name__ = ["hsl","haxe","Bond"];
hsl_haxe_Bond.prototype = {
	destroy: function() {
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,halt: function() {
		this.halted = true;
	}
	,resume: function() {
		this.halted = false;
	}
	,__class__: hsl_haxe_Bond
};
var hsl_haxe_Signaler = function() { };
hsl_haxe_Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl_haxe_Signaler.prototype = {
	__class__: hsl_haxe_Signaler
	,__properties__: {get_isListenedTo:"get_isListenedTo"}
};
var hsl_haxe_DirectSignaler = function(subject,rejectNullData) {
	if(null == subject) throw new js__$Boot_HaxeError(new haxe_exception_ArgumentNullException("subject",1));
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl_haxe__$DirectSignaler_SentinelBond();
};
hsl_haxe_DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl_haxe_DirectSignaler.__interfaces__ = [hsl_haxe_Signaler];
hsl_haxe_DirectSignaler.prototype = {
	addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,bind: function(listener) {
		if(null == listener) throw new js__$Boot_HaxeError(new haxe_exception_ArgumentNullException("listener",1));
		return this.sentinel.add(new hsl_haxe__$DirectSignaler_RegularBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new js__$Boot_HaxeError(new haxe_exception_ArgumentNullException("listener",1));
		return this.sentinel.add(new hsl_haxe__$DirectSignaler_AdvancedBond(listener));
	}
	,bindVoid: function(listener) {
		if(null == listener) throw new js__$Boot_HaxeError(new haxe_exception_ArgumentNullException("listener",1));
		return this.sentinel.add(new hsl_haxe__$DirectSignaler_NiladicBond(listener));
	}
	,bubble: function(data,origin) {
		if(null != this.bubblingTargets) {
			var _g_head = this.bubblingTargets.h;
			var _g_val = null;
			while(_g_head != null) {
				var bubblingTarget;
				bubblingTarget = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
		if(null != this.notificationTargets) {
			var _g_head1 = this.notificationTargets.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var notificationTarget;
				notificationTarget = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
				notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
	}
	,dispatch: function(data,origin,positionInformation) {
		if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) this.verifyCaller(positionInformation);
		if(this.rejectNullData && null == data) throw new js__$Boot_HaxeError(new haxe_exception_Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1));
		if(null == origin) origin = this.subject; else origin = origin;
		if(this.mostRecentPropagationUndisturbed = 3 == this.sentinel.callListener(data,this.subject,origin,3)) this.bubble(data,origin);
	}
	,get_isListenedTo: function() {
		return this.sentinel.get_isConnected();
	}
	,getOrigin: function(origin) {
		if(null == origin) return this.subject; else return origin;
	}
	,verifyCaller: function(positionInformation) {
		if(null == this.subjectClassNames) this.subjectClassNames = haxe_TypeTools.getClassNames(this.subject);
		var _g_head = this.subjectClassNames.h;
		var _g_val = null;
		while(_g_head != null) {
			var subjectClassName;
			subjectClassName = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(subjectClassName == positionInformation.className) return;
		}
		throw new js__$Boot_HaxeError(new haxe_exception_Exception("This method may only be called by the subject of the signaler.",null,2));
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl_haxe__$DirectSignaler_RegularBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl_haxe__$DirectSignaler_AdvancedBond(listener));
	}
	,unbindVoid: function(listener) {
		this.sentinel.remove(new hsl_haxe__$DirectSignaler_NiladicBond(listener));
	}
	,__class__: hsl_haxe_DirectSignaler
	,__properties__: {get_isListenedTo:"get_isListenedTo"}
};
var hsl_haxe__$DirectSignaler_LinkedBond = function() {
	hsl_haxe_Bond.call(this);
	this.destroyed = false;
};
hsl_haxe__$DirectSignaler_LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl_haxe__$DirectSignaler_LinkedBond.__super__ = hsl_haxe_Bond;
hsl_haxe__$DirectSignaler_LinkedBond.prototype = $extend(hsl_haxe_Bond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,determineEquals: function(value) {
		return false;
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,__class__: hsl_haxe__$DirectSignaler_LinkedBond
});
var hsl_haxe__$DirectSignaler_SentinelBond = function() {
	hsl_haxe__$DirectSignaler_LinkedBond.call(this);
	this.next = this.previous = this;
};
hsl_haxe__$DirectSignaler_SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl_haxe__$DirectSignaler_SentinelBond.__super__ = hsl_haxe__$DirectSignaler_LinkedBond;
hsl_haxe__$DirectSignaler_SentinelBond.prototype = $extend(hsl_haxe__$DirectSignaler_LinkedBond.prototype,{
	add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,get_isConnected: function() {
		return this.next != this;
	}
	,remove: function(value) {
		var node = this.next;
		while(node != this) {
			if(node.determineEquals(value)) {
				if(false == node.destroyed) {
					node.previous.next = node.next;
					node.next.previous = node.previous;
					node.destroyed = true;
				}
				break;
			}
			node = node.next;
		}
	}
	,__class__: hsl_haxe__$DirectSignaler_SentinelBond
	,__properties__: {get_isConnected:"get_isConnected"}
});
var hsl_haxe__$DirectSignaler_RegularBond = function(listener) {
	hsl_haxe__$DirectSignaler_LinkedBond.call(this);
	this.listener = listener;
};
hsl_haxe__$DirectSignaler_RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl_haxe__$DirectSignaler_RegularBond.__super__ = hsl_haxe__$DirectSignaler_LinkedBond;
hsl_haxe__$DirectSignaler_RegularBond.prototype = $extend(hsl_haxe__$DirectSignaler_LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener(data);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js_Boot.__instanceof(value,hsl_haxe__$DirectSignaler_RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl_haxe__$DirectSignaler_RegularBond
});
var hsl_haxe__$DirectSignaler_NiladicBond = function(listener) {
	hsl_haxe__$DirectSignaler_LinkedBond.call(this);
	this.listener = listener;
};
hsl_haxe__$DirectSignaler_NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl_haxe__$DirectSignaler_NiladicBond.__super__ = hsl_haxe__$DirectSignaler_LinkedBond;
hsl_haxe__$DirectSignaler_NiladicBond.prototype = $extend(hsl_haxe__$DirectSignaler_LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener();
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js_Boot.__instanceof(value,hsl_haxe__$DirectSignaler_NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl_haxe__$DirectSignaler_NiladicBond
});
var hsl_haxe__$DirectSignaler_AdvancedBond = function(listener) {
	hsl_haxe__$DirectSignaler_LinkedBond.call(this);
	this.listener = listener;
};
hsl_haxe__$DirectSignaler_AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl_haxe__$DirectSignaler_AdvancedBond.__super__ = hsl_haxe__$DirectSignaler_LinkedBond;
hsl_haxe__$DirectSignaler_AdvancedBond.prototype = $extend(hsl_haxe__$DirectSignaler_LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(this.halted == false) {
			var signal = new hsl_haxe_Signal(data,this,currentTarget,origin);
			this.listener(signal);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
			if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js_Boot.__instanceof(value,hsl_haxe__$DirectSignaler_AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl_haxe__$DirectSignaler_AdvancedBond
});
var hsl_haxe_PropagationStatus = function() { };
hsl_haxe_PropagationStatus.__name__ = ["hsl","haxe","PropagationStatus"];
var hsl_haxe_Signal = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
hsl_haxe_Signal.__name__ = ["hsl","haxe","Signal"];
hsl_haxe_Signal.prototype = {
	get_data1: function() {
		return this.data;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,stopPropagation: function() {
		this.propagationStopped = true;
	}
	,__class__: hsl_haxe_Signal
	,__properties__: {get_data1:"get_data1"}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var milkshake_Settings = function(width,height,color) {
	if(color == null) color = 16773120;
	if(height == null) height = 720;
	if(width == null) width = 200;
	this.width = width;
	this.height = height;
	this.color = color;
};
milkshake_Settings.__name__ = ["milkshake","Settings"];
milkshake_Settings.fromMilk = function(milkFile) {
	return new milkshake_Settings();
};
milkshake_Settings.prototype = {
	__class__: milkshake_Settings
};
var milkshake_Milkshake = $hx_exports.milkshake.Milkshake = function(settings) {
	this.settings = settings;
	this.renderer = PIXI.autoDetectRenderer(settings.width,settings.height,{ view : window.document.getElementById("canvas")});
	window.document.body.appendChild(this.renderer.view);
	this.raf = new milkshake_utils_RAFHelper($bind(this,this.update));
	this.raf.start();
	this.stage = new PIXI.Container();
	this.scenes = new milkshake_game_scene_SceneManager();
	this.stage.addChild(this.scenes.displayObject);
};
milkshake_Milkshake.__name__ = ["milkshake","Milkshake"];
milkshake_Milkshake.getInstance = function() {
	if(milkshake_Milkshake.instance != null) return milkshake_Milkshake.instance;
	return null;
};
milkshake_Milkshake.boot = function(settings) {
	return milkshake_Milkshake.instance = new milkshake_Milkshake(settings != null?settings:new milkshake_Settings());
};
milkshake_Milkshake.prototype = {
	update: function(delta) {
		this.scenes.update(delta);
		this.renderer.render(this.stage);
	}
	,__class__: milkshake_Milkshake
};
var milkshake_assets_SpriteSheets = function() { };
milkshake_assets_SpriteSheets.__name__ = ["milkshake","assets","SpriteSheets"];
var milkshake_assets_loader_AssetLoader = function(urls,autoLoad) {
	if(autoLoad == null) autoLoad = false;
	this.loader = new PIXI.loaders.Loader();
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		this.loader.add(url,url);
	}
	this.loaded = urls.length == 0;
	this.onLoadStarted = new hsl_haxe_DirectSignaler(this);
	this.onLoadUpdate = new hsl_haxe_DirectSignaler(this);
	this.onLoadComplete = new hsl_haxe_DirectSignaler(this);
	if(autoLoad) this.load();
};
milkshake_assets_loader_AssetLoader.__name__ = ["milkshake","assets","loader","AssetLoader"];
milkshake_assets_loader_AssetLoader.prototype = {
	load: function() {
		this.onLoadStarted.dispatch(null,this,{ fileName : "AssetLoader.hx", lineNumber : 36, className : "milkshake.assets.loader.AssetLoader", methodName : "load"});
		this.loader.once("complete",$bind(this,this.handleLoaded));
		this.loader.load();
	}
	,handleLoaded: function() {
		this.loaded = true;
		this.onLoadComplete.dispatch(null,this,{ fileName : "AssetLoader.hx", lineNumber : 46, className : "milkshake.assets.loader.AssetLoader", methodName : "handleLoaded"});
	}
	,__class__: milkshake_assets_loader_AssetLoader
};
var milkshake_core_Node = function(id) {
	if(id == null) {
		var e = Type["typeof"](this);
		this.id = e[0];
	} else this.id = id;
	this.nodes = [];
	this.onNodeAdded = new hsl_haxe_DirectSignaler(this);
	this.onNodeRemoved = new hsl_haxe_DirectSignaler(this);
};
milkshake_core_Node.__name__ = ["milkshake","core","Node"];
milkshake_core_Node.prototype = {
	update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			node.update(deltaTime);
		}
	}
	,addNode: function(node,defaultValues) {
		node.parent = this;
		this.nodes.push(node);
		if(defaultValues != null) {
			var _g = 0;
			var _g1 = Reflect.fields(defaultValues);
			while(_g < _g1.length) {
				var key = _g1[_g];
				++_g;
				Reflect.setProperty(node,key,Reflect.field(defaultValues,key));
			}
		}
		this.onNodeAdded.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 47, className : "milkshake.core.Node", methodName : "addNode"});
	}
	,removeNode: function(node) {
		node.parent = null;
		HxOverrides.remove(this.nodes,node);
		this.onNodeRemoved.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 55, className : "milkshake.core.Node", methodName : "removeNode"});
	}
	,__class__: milkshake_core_Node
};
var milkshake_core_Entity = function(id) {
	milkshake_core_Node.call(this,id);
	this.set_position(milkshake_math_Vector2.get_ZERO());
};
milkshake_core_Entity.__name__ = ["milkshake","core","Entity"];
milkshake_core_Entity.__super__ = milkshake_core_Node;
milkshake_core_Entity.prototype = $extend(milkshake_core_Node.prototype,{
	get_position: function() {
		return this.position;
	}
	,set_position: function(value) {
		return this.position = value;
	}
	,get_x: function() {
		return this.get_position().x;
	}
	,set_x: function(value) {
		return this.get_position().x = value;
	}
	,get_y: function() {
		return this.get_position().y;
	}
	,set_y: function(value) {
		return this.get_position().y = value;
	}
	,__class__: milkshake_core_Entity
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_position:"set_position",get_position:"get_position"}
});
var milkshake_core_DisplayObject = function(id) {
	milkshake_core_Entity.call(this,id);
	this.scale = milkshake_math_Vector2.get_ONE();
	this.pivot = milkshake_math_Vector2.get_ZERO();
	this.rotation = 0;
	this.visible = true;
	this.alpha = 1;
	this.displayObject = new PIXI.Container();
};
milkshake_core_DisplayObject.__name__ = ["milkshake","core","DisplayObject"];
milkshake_core_DisplayObject.__super__ = milkshake_core_Entity;
milkshake_core_DisplayObject.prototype = $extend(milkshake_core_Entity.prototype,{
	get_width: function() {
		return this.displayObject.width;
	}
	,get_height: function() {
		return this.displayObject.height;
	}
	,addNode: function(node,defaultValues) {
		if(js_Boot.__instanceof(node,milkshake_core_DisplayObject)) {
			var displayObjectNode = node;
			this.displayObject.addChild(displayObjectNode.displayObject);
			displayObjectNode.set_scene(this.get_scene());
			displayObjectNode.create();
		}
		milkshake_core_Entity.prototype.addNode.call(this,node,defaultValues);
	}
	,removeNode: function(node) {
		if(js_Boot.__instanceof(node,milkshake_core_DisplayObject)) {
			var displayObjectNode = node;
			this.displayObject.removeChild(displayObjectNode.displayObject);
			displayObjectNode.set_scene(null);
			displayObjectNode.destroy();
		}
		milkshake_core_Entity.prototype.removeNode.call(this,node);
	}
	,update: function(delta) {
		this.displayObject.position.x = this.get_position().x;
		this.displayObject.position.y = this.get_position().y;
		this.displayObject.scale.x = this.scale.x;
		this.displayObject.scale.y = this.scale.y;
		this.displayObject.alpha = this.alpha;
		this.displayObject.pivot.x = this.pivot.x;
		this.displayObject.pivot.y = this.pivot.y;
		this.displayObject.rotation = this.rotation;
		this.displayObject.visible = this.visible;
		this.displayObject.alpha = this.alpha;
		milkshake_core_Entity.prototype.update.call(this,delta);
	}
	,render: function(camera) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(node,milkshake_core_DisplayObject)) {
				var displayObjectNode = node;
				displayObjectNode.render(camera);
			}
		}
	}
	,get_scene: function() {
		return this._scene;
	}
	,set_scene: function(scene) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(node,milkshake_core_DisplayObject)) {
				var displayObjectNode = node;
				displayObjectNode.set_scene(scene);
			}
		}
		return this._scene = scene;
	}
	,create: function() {
	}
	,destroy: function() {
	}
	,__class__: milkshake_core_DisplayObject
	,__properties__: $extend(milkshake_core_Entity.prototype.__properties__,{get_height:"get_height",get_width:"get_width",set_scene:"set_scene",get_scene:"get_scene"})
});
var milkshake_core_Graphics = function() {
	milkshake_core_DisplayObject.call(this);
	this.anchor = milkshake_math_Vector2.get_ZERO();
	this.displayObject.addChild(this.graphics = new PIXI.Graphics());
};
milkshake_core_Graphics.__name__ = ["milkshake","core","Graphics"];
milkshake_core_Graphics.__super__ = milkshake_core_DisplayObject;
milkshake_core_Graphics.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	clear: function() {
		this.graphics.clear();
	}
	,begin: function(color,alpha,lineWidth,lineColor) {
		if(lineColor == null) lineColor = 16777215;
		if(lineWidth == null) lineWidth = 0;
		if(alpha == null) alpha = 1;
		this.graphics.beginFill(color,alpha);
		this.graphics.lineStyle(lineWidth,lineColor);
	}
	,drawRectangle: function(rectangle,fill) {
		this.graphics.drawRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
	}
	,update: function(delta) {
		milkshake_core_DisplayObject.prototype.update.call(this,delta);
		this.displayObject.pivot.x = this.graphics.width - (1 - this.anchor.x) * this.graphics.width;
		this.displayObject.pivot.y = this.graphics.height - (1 - this.anchor.y) * this.graphics.height;
	}
	,__class__: milkshake_core_Graphics
});
var milkshake_core_Sprite = function(texture,id) {
	if(id == null) id = "undefined-sprite";
	milkshake_core_DisplayObject.call(this,id);
	this.anchor = milkshake_math_Vector2.get_ZERO();
	this.displayObject.addChild(this.sprite = new PIXI.Sprite(texture));
};
milkshake_core_Sprite.__name__ = ["milkshake","core","Sprite"];
milkshake_core_Sprite.fromUrl = function(url) {
	return new milkshake_core_Sprite(PIXI.Texture.fromImage(url));
};
milkshake_core_Sprite.fromFrame = function(frame) {
	return new milkshake_core_Sprite(PIXI.Texture.fromFrame(frame));
};
milkshake_core_Sprite.__super__ = milkshake_core_DisplayObject;
milkshake_core_Sprite.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	update: function(delta) {
		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;
		milkshake_core_DisplayObject.prototype.update.call(this,delta);
	}
	,render: function(camera) {
	}
	,__class__: milkshake_core_Sprite
});
var milkshake_core_Text = function(message) {
	if(message == null) message = "";
	milkshake_core_DisplayObject.call(this);
	this.displayObject.addChild(this.text = new PIXI.Text(message));
};
milkshake_core_Text.__name__ = ["milkshake","core","Text"];
milkshake_core_Text.__super__ = milkshake_core_DisplayObject;
milkshake_core_Text.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	setText: function(message) {
		this.text.text = message;
	}
	,__class__: milkshake_core_Text
});
var milkshake_game_scene_Scene = function(id,content,defaultCameras,clearColor) {
	if(clearColor == null) clearColor = 16711680;
	milkshake_core_DisplayObject.call(this,id);
	this.set_scene(this);
	this.loader = new milkshake_assets_loader_AssetLoader(content);
	this.cameras = new milkshake_game_scene_camera_CameraManager(defaultCameras);
};
milkshake_game_scene_Scene.__name__ = ["milkshake","game","scene","Scene"];
milkshake_game_scene_Scene.__super__ = milkshake_core_DisplayObject;
milkshake_game_scene_Scene.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	__class__: milkshake_game_scene_Scene
});
var milkshake_game_scene_SceneManager = function() {
	milkshake_core_DisplayObject.call(this,"sceneManager");
	this.scenes = new haxe_ds_StringMap();
};
milkshake_game_scene_SceneManager.__name__ = ["milkshake","game","scene","SceneManager"];
milkshake_game_scene_SceneManager.__super__ = milkshake_core_DisplayObject;
milkshake_game_scene_SceneManager.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	addScene: function(scene) {
		this.scenes.set(scene.id,scene);
		if(this.currentScene == null) this.changeScene(scene.id);
	}
	,removeScene: function(sceneId) {
		this.scenes.remove(sceneId);
	}
	,changeScene: function(sceneId) {
		var _g = this;
		if(this.currentScene != null) this.removeNode(this.currentScene.cameras);
		this.currentScene = this.scenes.get(sceneId);
		this.set_scene(this.currentScene);
		if(this.currentScene.loader.loaded) {
			this.currentScene.create();
			this.addNode(this.currentScene.cameras);
		} else {
			this.currentScene.loader.onLoadComplete.bindVoid(function() {
				_g.currentScene.create();
				_g.addNode(_g.currentScene.cameras);
			}).destroyOnUse();
			this.currentScene.loader.load();
		}
	}
	,update: function(delta) {
		if(this.currentScene.loader.loaded) this.currentScene.update(delta);
		milkshake_core_DisplayObject.prototype.update.call(this,delta);
	}
	,__class__: milkshake_game_scene_SceneManager
});
var milkshake_game_scene_camera_Camera = function(id,x,y,width,height,renderWidth,renderHeight,active) {
	if(active == null) active = true;
	if(renderHeight == null) renderHeight = -1;
	if(renderWidth == null) renderWidth = -1;
	milkshake_core_DisplayObject.call(this,id);
	this.set_x(x);
	this.set_y(y);
	this.width = width;
	this.height = height;
	if(renderWidth != -1) this.renderWidth = renderWidth; else this.renderWidth = milkshake_utils_Globals.SCREEN_WIDTH;
	if(renderHeight != -1) this.renderHeight = renderHeight; else this.renderHeight = milkshake_utils_Globals.SCREEN_HEIGHT;
	this.active = active;
	this.boundingBox = new PIXI.Rectangle(0,0,1,1);
	this.renderTexture = new PIXI.RenderTexture(milkshake_Milkshake.getInstance().renderer,this.renderWidth,this.renderHeight);
	this.renderSprite = new PIXI.Sprite(this.renderTexture);
	this.renderSprite.width = width;
	this.renderSprite.height = height;
	this.targetPosition = new milkshake_math_Vector2(width,height).multi(milkshake_math_Vector2.get_HALF());
	this.targetZoom = 1;
	this.matrix = new PIXI.Matrix();
	this.displayObject.addChild(this.renderSprite);
	this.topLeft = new PIXI.Point(0,0);
	this.bottomRight = new PIXI.Point(this.renderWidth,this.renderHeight);
};
milkshake_game_scene_camera_Camera.__name__ = ["milkshake","game","scene","camera","Camera"];
milkshake_game_scene_camera_Camera.__super__ = milkshake_core_DisplayObject;
milkshake_game_scene_camera_Camera.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	update: function(delta) {
		this.matrix.identity();
		this.matrix.translate(-this.targetPosition.x,-this.targetPosition.y);
		this.matrix.scale(this.targetZoom,this.targetZoom);
		this.matrix.translate(this.get_width() / 2,this.get_height() / 2);
		this.updateBoundingBox();
		this.get_scene().render(this);
		this.renderTexture.render(this.get_scene().displayObject,this.matrix,true);
		milkshake_core_DisplayObject.prototype.update.call(this,delta);
	}
	,updateBoundingBox: function() {
		var debugPadding = 0;
		var topLeft = this.matrix.applyInverse(this.topLeft);
		var bottomRight = this.matrix.applyInverse(this.bottomRight);
		this.boundingBox.x = topLeft.x;
		this.boundingBox.y = topLeft.y;
		this.boundingBox.width = bottomRight.x - topLeft.x;
		this.boundingBox.height = bottomRight.y - topLeft.y;
	}
	,__class__: milkshake_game_scene_camera_Camera
});
var milkshake_game_scene_camera_CameraManager = function(cameras) {
	milkshake_core_DisplayObject.call(this,"cameraManager");
	if(cameras == null) cameras = milkshake_game_scene_camera_CameraPresets.get_DEFAULT();
	this.cameras = [];
	var _g = 0;
	while(_g < cameras.length) {
		var camera = cameras[_g];
		++_g;
		this.addCamera(camera);
	}
};
milkshake_game_scene_camera_CameraManager.__name__ = ["milkshake","game","scene","camera","CameraManager"];
milkshake_game_scene_camera_CameraManager.__super__ = milkshake_core_DisplayObject;
milkshake_game_scene_camera_CameraManager.prototype = $extend(milkshake_core_DisplayObject.prototype,{
	addCamera: function(camera) {
		this.cameras.push(camera);
		this.addNode(camera);
		this.currentCamera = camera;
		return camera;
	}
	,removeCamera: function(camera) {
		HxOverrides.remove(this.cameras,camera);
	}
	,switchCameras: function(cameraA,cameraB) {
		cameraA.active = false;
		cameraB.active = true;
	}
	,update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.get_activeCameras();
		while(_g < _g1.length) {
			var camera = _g1[_g];
			++_g;
			this.currentCamera = camera;
			camera.update(deltaTime);
		}
	}
	,get_activeCameras: function() {
		return this.cameras.filter(function(camera) {
			return camera.active;
		});
	}
	,__class__: milkshake_game_scene_camera_CameraManager
	,__properties__: $extend(milkshake_core_DisplayObject.prototype.__properties__,{get_activeCameras:"get_activeCameras"})
});
var milkshake_game_scene_camera_CameraPresets = function() { };
milkshake_game_scene_camera_CameraPresets.__name__ = ["milkshake","game","scene","camera","CameraPresets"];
milkshake_game_scene_camera_CameraPresets.__properties__ = {get_SPLIT_FOUR:"get_SPLIT_FOUR",get_SPLIT_VERTICAL:"get_SPLIT_VERTICAL",get_DEFAULT:"get_DEFAULT"}
milkshake_game_scene_camera_CameraPresets.get_DEFAULT = function() {
	return [new milkshake_game_scene_camera_Camera("MAIN",0,0,milkshake_utils_Globals.SCREEN_WIDTH,milkshake_utils_Globals.SCREEN_HEIGHT)];
};
milkshake_game_scene_camera_CameraPresets.get_SPLIT_VERTICAL = function() {
	return [new milkshake_game_scene_camera_Camera("TOP",0,0,milkshake_utils_Globals.SCREEN_WIDTH / 2 | 0,milkshake_utils_Globals.SCREEN_HEIGHT),new milkshake_game_scene_camera_Camera("BOTTOM",milkshake_utils_Globals.SCREEN_WIDTH / 2 | 0,0,milkshake_utils_Globals.SCREEN_WIDTH / 2 | 0,milkshake_utils_Globals.SCREEN_HEIGHT)];
};
milkshake_game_scene_camera_CameraPresets.get_SPLIT_FOUR = function() {
	var screenWidth = milkshake_utils_Globals.SCREEN_WIDTH / 2 | 0;
	var screenHeight = milkshake_utils_Globals.SCREEN_HEIGHT / 2 | 0;
	return [new milkshake_game_scene_camera_Camera("TOP_LEFT",0,0,screenWidth,screenHeight),new milkshake_game_scene_camera_Camera("TOP_RIGHT",screenWidth,0,screenWidth,screenHeight),new milkshake_game_scene_camera_Camera("BOTTOM_LEFT",0,screenHeight,screenWidth,screenHeight),new milkshake_game_scene_camera_Camera("BOTTOM_RIGHT",screenWidth,screenHeight,screenWidth,screenHeight)];
};
var milkshake_math_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
milkshake_math_Vector2.__name__ = ["milkshake","math","Vector2"];
milkshake_math_Vector2.__properties__ = {get_RIGHT:"get_RIGHT",get_LEFT:"get_LEFT",get_UP:"get_UP",get_DOWN:"get_DOWN",get_HALF:"get_HALF",get_ONE:"get_ONE",get_ZERO:"get_ZERO"}
milkshake_math_Vector2.get_ZERO = function() {
	return new milkshake_math_Vector2(0,0);
};
milkshake_math_Vector2.get_HALF = function() {
	return new milkshake_math_Vector2(0.5,0.5);
};
milkshake_math_Vector2.get_ONE = function() {
	return new milkshake_math_Vector2(1,1);
};
milkshake_math_Vector2.get_UP = function() {
	return new milkshake_math_Vector2(0,-1);
};
milkshake_math_Vector2.get_DOWN = function() {
	return new milkshake_math_Vector2(0,1);
};
milkshake_math_Vector2.get_LEFT = function() {
	return new milkshake_math_Vector2(-1,0);
};
milkshake_math_Vector2.get_RIGHT = function() {
	return new milkshake_math_Vector2(1,0);
};
milkshake_math_Vector2.EQUAL = function(value) {
	return new milkshake_math_Vector2(value,value);
};
milkshake_math_Vector2.multiplication = function(a,s) {
	return new milkshake_math_Vector2(a.x * s,a.y * s);
};
milkshake_math_Vector2.devision = function(a,s) {
	return new milkshake_math_Vector2(a.x / s,a.y / s);
};
milkshake_math_Vector2.addition = function(a,b) {
	return new milkshake_math_Vector2(a.x + b.x,a.y + b.y);
};
milkshake_math_Vector2.subtraction = function(a,b) {
	return new milkshake_math_Vector2(a.x - b.x,a.y - b.y);
};
milkshake_math_Vector2.prototype = {
	add: function(value) {
		this.x += value.x;
		this.y += value.y;
		return this;
	}
	,sub: function(value) {
		this.x -= value.x;
		this.y -= value.y;
		return this;
	}
	,multi: function(value) {
		return new milkshake_math_Vector2(this.x * value.x,this.y * value.y);
	}
	,multiSingle: function(value) {
		return new milkshake_math_Vector2(this.x * value,this.y * value);
	}
	,__class__: milkshake_math_Vector2
};
var milkshake_utils_Color = function() { };
milkshake_utils_Color.__name__ = ["milkshake","utils","Color"];
var milkshake_utils_Globals = function() { };
milkshake_utils_Globals.__name__ = ["milkshake","utils","Globals"];
milkshake_utils_Globals.__properties__ = {get_SCREEN_CENTER:"get_SCREEN_CENTER",get_SCREEN_SIZE:"get_SCREEN_SIZE"}
milkshake_utils_Globals.get_SCREEN_SIZE = function() {
	return new milkshake_math_Vector2(milkshake_utils_Globals.SCREEN_WIDTH,milkshake_utils_Globals.SCREEN_HEIGHT);
};
milkshake_utils_Globals.get_SCREEN_CENTER = function() {
	return new milkshake_math_Vector2(milkshake_utils_Globals.SCREEN_WIDTH / 2,milkshake_utils_Globals.SCREEN_HEIGHT / 2);
};
var milkshake_utils_GraphicsHelper = function() { };
milkshake_utils_GraphicsHelper.__name__ = ["milkshake","utils","GraphicsHelper"];
milkshake_utils_GraphicsHelper.generateRectangle = function(width,height,color) {
	var graphics = new milkshake_core_Graphics();
	graphics.graphics.beginFill(color);
	graphics.graphics.drawRect(0,0,width,height);
	return graphics;
};
var milkshake_utils_RAFHelper = function(updateCallback) {
	this.lastTimeStamp = -1;
	this.updateCallback = updateCallback;
	this.multiplier = 1;
};
milkshake_utils_RAFHelper.__name__ = ["milkshake","utils","RAFHelper"];
milkshake_utils_RAFHelper.prototype = {
	start: function() {
		window.requestAnimationFrame($bind(this,this.update));
	}
	,update: function(deltaTime) {
		if(this.lastTimeStamp == -1) this.lastTimeStamp = deltaTime;
		var modifiedDeltaTime = (deltaTime - this.lastTimeStamp) * this.multiplier;
		this.updateCallback(modifiedDeltaTime);
		this.start();
		this.lastTimeStamp = deltaTime;
		return true;
	}
	,__class__: milkshake_utils_RAFHelper
};
var milkshake_utils_TweenUtils = function() { };
milkshake_utils_TweenUtils.__name__ = ["milkshake","utils","TweenUtils"];
milkshake_utils_TweenUtils.tween = function(target,duration,properties) {
	return motion_Actuate.tween(target,duration,properties);
};
milkshake_utils_TweenUtils.tweenFrom = function(target,duration,properties) {
	var currentVariables = { };
	var _g = 0;
	var _g1 = Reflect.fields(properties);
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		Reflect.setField(currentVariables,property,Reflect.getProperty(target,property));
	}
	var _g2 = 0;
	var _g11 = Reflect.fields(properties);
	while(_g2 < _g11.length) {
		var property1 = _g11[_g2];
		++_g2;
		Reflect.setProperty(target,property1,Reflect.field(properties,property1));
	}
	return motion_Actuate.tween(target,duration,currentVariables);
};
var motion_actuators_IGenericActuator = function() { };
motion_actuators_IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
motion_actuators_GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return Reflect.callMethod(method,method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) this.callMethod(this._onPause,this._onPauseParams);
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) this.callMethod(this._onResume,this._onResumeParams);
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe_Timer.stamp();
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		motion_actuators_SimpleActuator.timer = new haxe_Timer(33);
		motion_actuators_SimpleActuator.timer.run = motion_actuators_SimpleActuator.stage_onEnterFrame;
	}
};
motion_actuators_SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion_actuators_SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe_Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var value = this.getField(this.properties,i);
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe_Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe_Timer.stamp() - this.pauseTime;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
motion_easing_Expo.__name__ = ["motion","easing","Expo"];
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Expo.get_easeIn = function() {
	return new motion_easing_ExpoEaseIn();
};
motion_easing_Expo.get_easeInOut = function() {
	return new motion_easing_ExpoEaseInOut();
};
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
motion_easing_IEasing.__name__ = ["motion","easing","IEasing"];
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
motion_easing_ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		if(t == d) return b + c; else return c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
motion_Actuate.__name__ = ["motion","Actuate"];
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		result = true;
		break;
	}
	return result;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
motion__$Actuate_TweenTimer.__name__ = ["motion","_Actuate","TweenTimer"];
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion_ComponentPath();
	this._y = new motion_ComponentPath();
	this._rotation = null;
};
motion_MotionPath.__name__ = ["motion","MotionPath"];
motion_MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_BezierPath(x,controlX,strength));
		this._y.addPath(new motion_BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_LinearPath(x,strength));
		this._y.addPath(new motion_LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion_RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
motion_IComponentPath.__name__ = ["motion","IComponentPath"];
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_ComponentPath = function() {
	this.paths = [];
	this.start = 0;
	this.totalStrength = 0;
};
motion_ComponentPath.__name__ = ["motion","ComponentPath"];
motion_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion_ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion_ComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
motion_BezierPath.__name__ = ["motion","BezierPath"];
motion_BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion_BezierPath
};
var motion_LinearPath = function(end,strength) {
	motion_BezierPath.call(this,end,0,strength);
};
motion_LinearPath.__name__ = ["motion","LinearPath"];
motion_LinearPath.__super__ = motion_BezierPath;
motion_LinearPath.prototype = $extend(motion_BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion_LinearPath
});
var motion_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
motion_RotationPath.__name__ = ["motion","RotationPath"];
motion_RotationPath.__interfaces__ = [motion_IComponentPath];
motion_RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion_RotationPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
motion_actuators_MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
motion_actuators_MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_MotionPathActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
motion_actuators_PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
motion_actuators_PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_Elastic = function() { };
motion_easing_Elastic.__name__ = ["motion","easing","Elastic"];
motion_easing_Elastic.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Elastic.get_easeIn = function() {
	return new motion_easing_ElasticEaseIn(0.1,0.4);
};
motion_easing_Elastic.get_easeInOut = function() {
	return new motion_easing_ElasticEaseInOut(0.1,0.4);
};
motion_easing_Elastic.get_easeOut = function() {
	return new motion_easing_ElasticEaseOut(0.1,0.4);
};
var motion_easing_ElasticEaseIn = function(a,p) {
	this.a = a;
	this.p = p;
};
motion_easing_ElasticEaseIn.__name__ = ["motion","easing","ElasticEaseIn"];
motion_easing_ElasticEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ElasticEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		var s;
		if(this.a < 1) {
			this.a = 1;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(1 / this.a);
		return -(this.a * Math.pow(2,10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / this.p));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d) == 1) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		return -(this.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p)) + b;
	}
	,__class__: motion_easing_ElasticEaseIn
};
var motion_easing_ElasticEaseInOut = function(a,p) {
	this.a = a;
	this.p = p;
};
motion_easing_ElasticEaseInOut.__name__ = ["motion","easing","ElasticEaseInOut"];
motion_easing_ElasticEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ElasticEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if((k /= 0.5) == 2) return 1;
		var p = 0.449999999999999956;
		var a = 1;
		var s = p / 4;
		if(k < 1) return -0.5 * (Math.pow(2,10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		return Math.pow(2,-10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d / 2) == 2) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		if(t < 1) return -0.5 * (this.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p)) + b;
		return this.a * Math.pow(2,-10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p) * 0.5 + c + b;
	}
	,__class__: motion_easing_ElasticEaseInOut
};
var motion_easing_ElasticEaseOut = function(a,p) {
	this.a = a;
	this.p = p;
};
motion_easing_ElasticEaseOut.__name__ = ["motion","easing","ElasticEaseOut"];
motion_easing_ElasticEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ElasticEaseOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		var s;
		if(this.a < 1) {
			this.a = 1;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(1 / this.a);
		return this.a * Math.pow(2,-10 * k) * Math.sin((k - s) * (2 * Math.PI) / this.p) + 1;
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d) == 1) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		return this.a * Math.pow(2,-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / this.p) + c + b;
	}
	,__class__: motion_easing_ElasticEaseOut
};
var motion_easing_ExpoEaseIn = function() {
};
motion_easing_ExpoEaseIn.__name__ = ["motion","easing","ExpoEaseIn"];
motion_easing_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0; else return Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b; else return c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion_easing_ExpoEaseIn
};
var motion_easing_ExpoEaseInOut = function() {
};
motion_easing_ExpoEaseInOut.__name__ = ["motion","easing","ExpoEaseInOut"];
motion_easing_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion_easing_ExpoEaseInOut
};
var motion_easing_Linear = function() { };
motion_easing_Linear.__name__ = ["motion","easing","Linear"];
motion_easing_Linear.__properties__ = {get_easeNone:"get_easeNone"}
motion_easing_Linear.get_easeNone = function() {
	return new motion_easing_LinearEaseNone();
};
var motion_easing_LinearEaseNone = function() {
};
motion_easing_LinearEaseNone.__name__ = ["motion","easing","LinearEaseNone"];
motion_easing_LinearEaseNone.__interfaces__ = [motion_easing_IEasing];
motion_easing_LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,ease: function(t,b,c,d) {
		return c * t / d + b;
	}
	,__class__: motion_easing_LinearEaseNone
};
var scenes_TestScene = function() {
	milkshake_game_scene_Scene.call(this,"TestScene",["assets/images/dino/stars.png"],milkshake_game_scene_camera_CameraPresets.get_DEFAULT(),255);
};
scenes_TestScene.__name__ = ["scenes","TestScene"];
scenes_TestScene.__super__ = milkshake_game_scene_Scene;
scenes_TestScene.prototype = $extend(milkshake_game_scene_Scene.prototype,{
	create: function() {
		var _g = this;
		milkshake_game_scene_Scene.prototype.create.call(this);
		this.addNode(new milkshake_core_Sprite(PIXI.Texture.fromImage("assets/images/dino/stars.png")));
		this.addNode(this.logo = new milkshake_core_Sprite(PIXI.Texture.fromImage("assets/images/dino/logo.png")),{ anchor : milkshake_math_Vector2.get_HALF(), position : new milkshake_math_Vector2(milkshake_utils_Globals.get_SCREEN_CENTER().x,140)});
		this.addNode(this.world = new milkshake_core_Sprite(PIXI.Texture.fromImage("assets/images/dino/world.png")),{ anchor : milkshake_math_Vector2.get_HALF(), position : new milkshake_math_Vector2(milkshake_utils_Globals.get_SCREEN_CENTER().x,milkshake_utils_Globals.SCREEN_HEIGHT + 200), scale : milkshake_math_Vector2.EQUAL(0.8)});
		this.addNode(this.moon = new milkshake_core_Sprite(PIXI.Texture.fromImage("assets/images/dino/moon.png")),{ anchor : milkshake_math_Vector2.get_HALF(), position : new milkshake_math_Vector2(203,173), rotation : -0.2, scale : milkshake_math_Vector2.EQUAL(1)});
		milkshake_utils_TweenUtils.tweenFrom(this.world,2,{ y : milkshake_utils_Globals.SCREEN_HEIGHT * 2}).delay(1).ease(motion_easing_Elastic.get_easeOut());
		milkshake_utils_TweenUtils.tweenFrom(this.logo,1,{ y : -200}).delay(1).ease(motion_easing_Elastic.get_easeOut());
		milkshake_utils_TweenUtils.tweenFrom(this.moon,1,{ x : -200}).delay(2).ease(motion_easing_Elastic.get_easeOut()).onComplete(function() {
			motion_Actuate.tween(_g.moon.scale,1,{ x : 1.25, y : 1.25}).ease(motion_easing_Linear.get_easeNone()).repeat().reflect();
			motion_Actuate.tween(_g.moon,1,{ rotation : 0.2}).ease(motion_easing_Linear.get_easeNone()).repeat().reflect();
		});
	}
	,update: function(deltaTime) {
		milkshake_game_scene_Scene.prototype.update.call(this,deltaTime);
		this.world.rotation += 0.001 * deltaTime;
	}
	,__class__: scenes_TestScene
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
haxe_ds_ObjectMap.count = 0;
hsl_haxe_PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl_haxe_PropagationStatus.STOPPED = 2;
hsl_haxe_PropagationStatus.UNDISTURBED = 3;
js_Boot.__toStr = {}.toString;
milkshake_assets_SpriteSheets.PHYSICS = "/assets/spritesheets/physics.json";
milkshake_utils_Color.BLACK = 0;
milkshake_utils_Color.WHITE = 16777215;
milkshake_utils_Color.RED = 16711680;
milkshake_utils_Color.GREEN = 65280;
milkshake_utils_Color.BLUE = 255;
milkshake_utils_Globals.SCREEN_WIDTH = 1280;
milkshake_utils_Globals.SCREEN_HEIGHT = 720;
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
Space.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
