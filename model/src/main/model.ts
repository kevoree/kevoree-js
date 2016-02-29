import * as kmf from './kmf';

export var modeling = kmf;

export class KevoreeModel extends kmf.abs.AbstractKModel<KevoreeUniverse> {

    private _metaModel: kmf.meta.KMetaModel;
    constructor(p_manager: kmf.memory.manager.internal.KInternalDataManager) {
        super(p_manager);
        this._metaModel = new kmf.meta.impl.MetaModel("Kevoree");
        var tempMetaClasses: kmf.meta.KMetaClass[] = new Array();
        tempMetaClasses[25] = meta.MetaParam.getInstance();
        tempMetaClasses[15] = meta.MetaPortType.getInstance();
        tempMetaClasses[1] = meta.MetaNode.getInstance();
        tempMetaClasses[14] = meta.MetaPort.getInstance();
        tempMetaClasses[36] = meta.MetaMinConstraint.getInstance();
        tempMetaClasses[19] = meta.MetaNodeType.getInstance();
        tempMetaClasses[20] = meta.MetaGroupType.getInstance();
        tempMetaClasses[12] = meta.MetaOutputPort.getInstance();
        tempMetaClasses[7] = meta.MetaInstance.getInstance();
        tempMetaClasses[35] = meta.MetaListParamType.getInstance();
        tempMetaClasses[6] = meta.MetaValue.getInstance();
        tempMetaClasses[38] = meta.MetaMultilineConstraint.getInstance();
        tempMetaClasses[4] = meta.MetaNamespace.getInstance();
        tempMetaClasses[27] = meta.MetaNumberParam.getInstance();
        tempMetaClasses[17] = meta.MetaDeployUnit.getInstance();
        tempMetaClasses[31] = meta.MetaStringParamType.getInstance();
        tempMetaClasses[2] = meta.MetaChannel.getInstance();
        tempMetaClasses[16] = meta.MetaDictionaryType.getInstance();
        tempMetaClasses[3] = meta.MetaGroup.getInstance();
        tempMetaClasses[10] = meta.MetaComponent.getInstance();
        tempMetaClasses[26] = meta.MetaStringParam.getInstance();
        tempMetaClasses[37] = meta.MetaMaxConstraint.getInstance();
        tempMetaClasses[0] = meta.MetaModel.getInstance();
        tempMetaClasses[9] = meta.MetaDictionary.getInstance();
        tempMetaClasses[13] = meta.MetaFragmentDictionary.getInstance();
        tempMetaClasses[18] = meta.MetaPreferedVersion.getInstance();
        tempMetaClasses[23] = meta.MetaParamType.getInstance();
        tempMetaClasses[5] = meta.MetaElement.getInstance();
        tempMetaClasses[24] = meta.MetaAbstractConstraint.getInstance();
        tempMetaClasses[29] = meta.MetaListParam.getInstance();
        tempMetaClasses[30] = meta.MetaItem.getInstance();
        tempMetaClasses[8] = meta.MetaTypeDefinition.getInstance();
        tempMetaClasses[33] = meta.MetaBooleanParamType.getInstance();
        tempMetaClasses[34] = meta.MetaChoiceParamType.getInstance();
        tempMetaClasses[32] = meta.MetaNumberParamType.getInstance();
        tempMetaClasses[28] = meta.MetaBooleanParam.getInstance();
        tempMetaClasses[21] = meta.MetaChannelType.getInstance();
        tempMetaClasses[22] = meta.MetaComponentType.getInstance();
        tempMetaClasses[11] = meta.MetaInputPort.getInstance();
        var tempEnums: kmf.meta.KMetaEnum[] = new Array();
        tempEnums[0] = meta.MetaNumberType.getInstance();
        (<kmf.meta.impl.MetaModel>this._metaModel).init(tempMetaClasses, tempEnums);
    }

    public internalCreateUniverse(key: number): KevoreeUniverse {
        return new KevoreeUniverse(key, this._manager);
    }

    public metaModel(): kmf.meta.KMetaModel {
        return this._metaModel;
    }

    public internalCreateObject(universe: number, time: number, uuid: number, p_clazz: kmf.meta.KMetaClass, previousUniverse: number, previousTime: number): kmf.KObject {
        if (p_clazz == null) {
            return null;
        }
        switch (p_clazz.index()) {
            case 15:
                return new impl.PortTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 1:
                return new impl.NodeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 14:
                return new impl.PortImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 36:
                return new impl.MinConstraintImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 19:
                return new impl.NodeTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 20:
                return new impl.GroupTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 12:
                return new impl.OutputPortImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 35:
                return new impl.ListParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 6:
                return new impl.ValueImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 38:
                return new impl.MultilineConstraintImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 4:
                return new impl.NamespaceImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 27:
                return new impl.NumberParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 17:
                return new impl.DeployUnitImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 31:
                return new impl.StringParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 2:
                return new impl.ChannelImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 16:
                return new impl.DictionaryTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 3:
                return new impl.GroupImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 10:
                return new impl.ComponentImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 26:
                return new impl.StringParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 37:
                return new impl.MaxConstraintImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 0:
                return new impl.ModelImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 9:
                return new impl.DictionaryImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 13:
                return new impl.FragmentDictionaryImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 18:
                return new impl.PreferedVersionImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 5:
                return new impl.ElementImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 29:
                return new impl.ListParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 30:
                return new impl.ItemImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 33:
                return new impl.BooleanParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 34:
                return new impl.ChoiceParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 32:
                return new impl.NumberParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 28:
                return new impl.BooleanParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 21:
                return new impl.ChannelTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 22:
                return new impl.ComponentTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 11:
                return new impl.InputPortImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            default:
                return new kmf.meta.impl.GenericObject(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        }
    }

    public createPortType(universe: number, time: number): PortType {
        return <PortType>this.create(meta.MetaPortType.getInstance(), universe, time);
    }

    public createNode(universe: number, time: number): Node {
        return <Node>this.create(meta.MetaNode.getInstance(), universe, time);
    }

    public createPort(universe: number, time: number): Port {
        return <Port>this.create(meta.MetaPort.getInstance(), universe, time);
    }

    public createMinConstraint(universe: number, time: number): MinConstraint {
        return <MinConstraint>this.create(meta.MetaMinConstraint.getInstance(), universe, time);
    }

    public createNodeType(universe: number, time: number): NodeType {
        return <NodeType>this.create(meta.MetaNodeType.getInstance(), universe, time);
    }

    public createGroupType(universe: number, time: number): GroupType {
        return <GroupType>this.create(meta.MetaGroupType.getInstance(), universe, time);
    }

    public createOutputPort(universe: number, time: number): OutputPort {
        return <OutputPort>this.create(meta.MetaOutputPort.getInstance(), universe, time);
    }

    public createListParamType(universe: number, time: number): ListParamType {
        return <ListParamType>this.create(meta.MetaListParamType.getInstance(), universe, time);
    }

    public createValue(universe: number, time: number): Value {
        return <Value>this.create(meta.MetaValue.getInstance(), universe, time);
    }

    public createMultilineConstraint(universe: number, time: number): MultilineConstraint {
        return <MultilineConstraint>this.create(meta.MetaMultilineConstraint.getInstance(), universe, time);
    }

    public createNamespace(universe: number, time: number): Namespace {
        return <Namespace>this.create(meta.MetaNamespace.getInstance(), universe, time);
    }

    public createNumberParam(universe: number, time: number): NumberParam {
        return <NumberParam>this.create(meta.MetaNumberParam.getInstance(), universe, time);
    }

    public createDeployUnit(universe: number, time: number): DeployUnit {
        return <DeployUnit>this.create(meta.MetaDeployUnit.getInstance(), universe, time);
    }

    public createStringParamType(universe: number, time: number): StringParamType {
        return <StringParamType>this.create(meta.MetaStringParamType.getInstance(), universe, time);
    }

    public createChannel(universe: number, time: number): Channel {
        return <Channel>this.create(meta.MetaChannel.getInstance(), universe, time);
    }

    public createDictionaryType(universe: number, time: number): DictionaryType {
        return <DictionaryType>this.create(meta.MetaDictionaryType.getInstance(), universe, time);
    }

    public createGroup(universe: number, time: number): Group {
        return <Group>this.create(meta.MetaGroup.getInstance(), universe, time);
    }

    public createComponent(universe: number, time: number): Component {
        return <Component>this.create(meta.MetaComponent.getInstance(), universe, time);
    }

    public createStringParam(universe: number, time: number): StringParam {
        return <StringParam>this.create(meta.MetaStringParam.getInstance(), universe, time);
    }

    public createMaxConstraint(universe: number, time: number): MaxConstraint {
        return <MaxConstraint>this.create(meta.MetaMaxConstraint.getInstance(), universe, time);
    }

    public createModel(universe: number, time: number): Model {
        return <Model>this.create(meta.MetaModel.getInstance(), universe, time);
    }

    public createDictionary(universe: number, time: number): Dictionary {
        return <Dictionary>this.create(meta.MetaDictionary.getInstance(), universe, time);
    }

    public createFragmentDictionary(universe: number, time: number): FragmentDictionary {
        return <FragmentDictionary>this.create(meta.MetaFragmentDictionary.getInstance(), universe, time);
    }

    public createPreferedVersion(universe: number, time: number): PreferedVersion {
        return <PreferedVersion>this.create(meta.MetaPreferedVersion.getInstance(), universe, time);
    }

    public createElement(universe: number, time: number): Element {
        return <Element>this.create(meta.MetaElement.getInstance(), universe, time);
    }

    public createListParam(universe: number, time: number): ListParam {
        return <ListParam>this.create(meta.MetaListParam.getInstance(), universe, time);
    }

    public createItem(universe: number, time: number): Item {
        return <Item>this.create(meta.MetaItem.getInstance(), universe, time);
    }

    public createBooleanParamType(universe: number, time: number): BooleanParamType {
        return <BooleanParamType>this.create(meta.MetaBooleanParamType.getInstance(), universe, time);
    }

    public createChoiceParamType(universe: number, time: number): ChoiceParamType {
        return <ChoiceParamType>this.create(meta.MetaChoiceParamType.getInstance(), universe, time);
    }

    public createNumberParamType(universe: number, time: number): NumberParamType {
        return <NumberParamType>this.create(meta.MetaNumberParamType.getInstance(), universe, time);
    }

    public createBooleanParam(universe: number, time: number): BooleanParam {
        return <BooleanParam>this.create(meta.MetaBooleanParam.getInstance(), universe, time);
    }

    public createChannelType(universe: number, time: number): ChannelType {
        return <ChannelType>this.create(meta.MetaChannelType.getInstance(), universe, time);
    }

    public createComponentType(universe: number, time: number): ComponentType {
        return <ComponentType>this.create(meta.MetaComponentType.getInstance(), universe, time);
    }

    public createInputPort(universe: number, time: number): InputPort {
        return <InputPort>this.create(meta.MetaInputPort.getInstance(), universe, time);
    }

}

export class KevoreeUniverse extends kmf.abs.AbstractKUniverse<KevoreeView, KevoreeUniverse> {

    constructor(p_key: number, p_manager: kmf.memory.manager.internal.KInternalDataManager) {
        super(p_key, p_manager);
    }

    public internal_create(timePoint: number): KevoreeView {
        return new impl.KevoreeViewImpl(this._universe, timePoint, this._manager);
    }

}

export interface KevoreeView extends kmf.KView {

    createPortType(): PortType;

    createNode(): Node;

    createPort(): Port;

    createMinConstraint(): MinConstraint;

    createNodeType(): NodeType;

    createGroupType(): GroupType;

    createOutputPort(): OutputPort;

    createListParamType(): ListParamType;

    createValue(): Value;

    createMultilineConstraint(): MultilineConstraint;

    createNamespace(): Namespace;

    createNumberParam(): NumberParam;

    createDeployUnit(): DeployUnit;

    createStringParamType(): StringParamType;

    createChannel(): Channel;

    createDictionaryType(): DictionaryType;

    createGroup(): Group;

    createComponent(): Component;

    createStringParam(): StringParam;

    createMaxConstraint(): MaxConstraint;

    createModel(): Model;

    createDictionary(): Dictionary;

    createFragmentDictionary(): FragmentDictionary;

    createPreferedVersion(): PreferedVersion;

    createElement(): Element;

    createListParam(): ListParam;

    createItem(): Item;

    createBooleanParamType(): BooleanParamType;

    createChoiceParamType(): ChoiceParamType;

    createNumberParamType(): NumberParamType;

    createBooleanParam(): BooleanParam;

    createChannelType(): ChannelType;

    createComponentType(): ComponentType;

    createInputPort(): InputPort;

}

export namespace impl {
    export class KevoreeViewImpl extends kmf.abs.AbstractKView implements KevoreeView {

        constructor(p_universe: number, _time: number, p_manager: kmf.memory.manager.internal.KInternalDataManager) {
            super(p_universe, _time, p_manager);
        }

        public createPortType(): PortType {
            return <PortType>this.create(meta.MetaPortType.getInstance());
        }

        public createNode(): Node {
            return <Node>this.create(meta.MetaNode.getInstance());
        }

        public createPort(): Port {
            return <Port>this.create(meta.MetaPort.getInstance());
        }

        public createMinConstraint(): MinConstraint {
            return <MinConstraint>this.create(meta.MetaMinConstraint.getInstance());
        }

        public createNodeType(): NodeType {
            return <NodeType>this.create(meta.MetaNodeType.getInstance());
        }

        public createGroupType(): GroupType {
            return <GroupType>this.create(meta.MetaGroupType.getInstance());
        }

        public createOutputPort(): OutputPort {
            return <OutputPort>this.create(meta.MetaOutputPort.getInstance());
        }

        public createListParamType(): ListParamType {
            return <ListParamType>this.create(meta.MetaListParamType.getInstance());
        }

        public createValue(): Value {
            return <Value>this.create(meta.MetaValue.getInstance());
        }

        public createMultilineConstraint(): MultilineConstraint {
            return <MultilineConstraint>this.create(meta.MetaMultilineConstraint.getInstance());
        }

        public createNamespace(): Namespace {
            return <Namespace>this.create(meta.MetaNamespace.getInstance());
        }

        public createNumberParam(): NumberParam {
            return <NumberParam>this.create(meta.MetaNumberParam.getInstance());
        }

        public createDeployUnit(): DeployUnit {
            return <DeployUnit>this.create(meta.MetaDeployUnit.getInstance());
        }

        public createStringParamType(): StringParamType {
            return <StringParamType>this.create(meta.MetaStringParamType.getInstance());
        }

        public createChannel(): Channel {
            return <Channel>this.create(meta.MetaChannel.getInstance());
        }

        public createDictionaryType(): DictionaryType {
            return <DictionaryType>this.create(meta.MetaDictionaryType.getInstance());
        }

        public createGroup(): Group {
            return <Group>this.create(meta.MetaGroup.getInstance());
        }

        public createComponent(): Component {
            return <Component>this.create(meta.MetaComponent.getInstance());
        }

        public createStringParam(): StringParam {
            return <StringParam>this.create(meta.MetaStringParam.getInstance());
        }

        public createMaxConstraint(): MaxConstraint {
            return <MaxConstraint>this.create(meta.MetaMaxConstraint.getInstance());
        }

        public createModel(): Model {
            return <Model>this.create(meta.MetaModel.getInstance());
        }

        public createDictionary(): Dictionary {
            return <Dictionary>this.create(meta.MetaDictionary.getInstance());
        }

        public createFragmentDictionary(): FragmentDictionary {
            return <FragmentDictionary>this.create(meta.MetaFragmentDictionary.getInstance());
        }

        public createPreferedVersion(): PreferedVersion {
            return <PreferedVersion>this.create(meta.MetaPreferedVersion.getInstance());
        }

        public createElement(): Element {
            return <Element>this.create(meta.MetaElement.getInstance());
        }

        public createListParam(): ListParam {
            return <ListParam>this.create(meta.MetaListParam.getInstance());
        }

        public createItem(): Item {
            return <Item>this.create(meta.MetaItem.getInstance());
        }

        public createBooleanParamType(): BooleanParamType {
            return <BooleanParamType>this.create(meta.MetaBooleanParamType.getInstance());
        }

        public createChoiceParamType(): ChoiceParamType {
            return <ChoiceParamType>this.create(meta.MetaChoiceParamType.getInstance());
        }

        public createNumberParamType(): NumberParamType {
            return <NumberParamType>this.create(meta.MetaNumberParamType.getInstance());
        }

        public createBooleanParam(): BooleanParam {
            return <BooleanParam>this.create(meta.MetaBooleanParam.getInstance());
        }

        public createChannelType(): ChannelType {
            return <ChannelType>this.create(meta.MetaChannelType.getInstance());
        }

        public createComponentType(): ComponentType {
            return <ComponentType>this.create(meta.MetaComponentType.getInstance());
        }

        public createInputPort(): InputPort {
            return <InputPort>this.create(meta.MetaInputPort.getInstance());
        }

    }

}
export interface AbstractConstraint extends kmf.KObject, Element {

    addMetaData(p_obj: Value): AbstractConstraint;

    removeMetaData(p_obj: Value): AbstractConstraint;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface BooleanParam extends kmf.KObject, Param {

    getName(): string;

    setName(p_obj: string): BooleanParam;

    getValue(): boolean;

    setValue(p_obj: boolean): BooleanParam;

    addMetaData(p_obj: Value): BooleanParam;

    removeMetaData(p_obj: Value): BooleanParam;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addType(p_obj: ParamType): BooleanParam;

    removeType(p_obj: ParamType): BooleanParam;

    getType(cb: kmf.KCallback<ParamType[]>): void;

    sizeOfType(): number;

}

export interface BooleanParamType extends kmf.KObject, ParamType {

    getDefault(): boolean;

    setDefault(p_obj: boolean): BooleanParamType;

    getFragment(): boolean;

    setFragment(p_obj: boolean): BooleanParamType;

    getName(): string;

    setName(p_obj: string): BooleanParamType;

    getDescription(): string;

    setDescription(p_obj: string): BooleanParamType;

    getRequired(): boolean;

    setRequired(p_obj: boolean): BooleanParamType;

    addMetaData(p_obj: Value): BooleanParamType;

    removeMetaData(p_obj: Value): BooleanParamType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addConstraints(p_obj: AbstractConstraint): BooleanParamType;

    removeConstraints(p_obj: AbstractConstraint): BooleanParamType;

    getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void;

    sizeOfConstraints(): number;

}

export interface Channel extends kmf.KObject, Instance {

    getName(): string;

    setName(p_obj: string): Channel;

    getStarted(): boolean;

    setStarted(p_obj: boolean): Channel;

    addOutputs(p_obj: OutputPort): Channel;

    removeOutputs(p_obj: OutputPort): Channel;

    getOutputs(cb: kmf.KCallback<OutputPort[]>): void;

    sizeOfOutputs(): number;

    addMetaData(p_obj: Value): Channel;

    removeMetaData(p_obj: Value): Channel;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: Dictionary): Channel;

    removeDictionary(p_obj: Dictionary): Channel;

    getDictionary(cb: kmf.KCallback<Dictionary[]>): void;

    sizeOfDictionary(): number;

    addInputs(p_obj: InputPort): Channel;

    removeInputs(p_obj: InputPort): Channel;

    getInputs(cb: kmf.KCallback<InputPort[]>): void;

    sizeOfInputs(): number;

    addTypeDefinition(p_obj: TypeDefinition): Channel;

    removeTypeDefinition(p_obj: TypeDefinition): Channel;

    getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void;

    sizeOfTypeDefinition(): number;

    addFragmentDictionary(p_obj: FragmentDictionary): Channel;

    removeFragmentDictionary(p_obj: FragmentDictionary): Channel;

    getFragmentDictionary(cb: kmf.KCallback<FragmentDictionary[]>): void;

    sizeOfFragmentDictionary(): number;

}

export interface ChannelType extends kmf.KObject, TypeDefinition {

    getName(): string;

    setName(p_obj: string): ChannelType;

    getDescription(): string;

    setDescription(p_obj: string): ChannelType;

    getRemote(): boolean;

    setRemote(p_obj: boolean): ChannelType;

    getFragmentable(): boolean;

    setFragmentable(p_obj: boolean): ChannelType;

    getVersion(): number;

    setVersion(p_obj: number): ChannelType;

    addMetaData(p_obj: Value): ChannelType;

    removeMetaData(p_obj: Value): ChannelType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: DictionaryType): ChannelType;

    removeDictionary(p_obj: DictionaryType): ChannelType;

    getDictionary(cb: kmf.KCallback<DictionaryType[]>): void;

    sizeOfDictionary(): number;

    addDeployUnits(p_obj: DeployUnit): ChannelType;

    removeDeployUnits(p_obj: DeployUnit): ChannelType;

    getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void;

    sizeOfDeployUnits(): number;

    addPreferedVersions(p_obj: PreferedVersion): ChannelType;

    removePreferedVersions(p_obj: PreferedVersion): ChannelType;

    getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void;

    sizeOfPreferedVersions(): number;

}

export interface ChoiceParamType extends kmf.KObject, ParamType {

    getDefault(): string;

    setDefault(p_obj: string): ChoiceParamType;

    getFragment(): boolean;

    setFragment(p_obj: boolean): ChoiceParamType;

    getName(): string;

    setName(p_obj: string): ChoiceParamType;

    getDescription(): string;

    setDescription(p_obj: string): ChoiceParamType;

    getRequired(): boolean;

    setRequired(p_obj: boolean): ChoiceParamType;

    addMetaData(p_obj: Value): ChoiceParamType;

    removeMetaData(p_obj: Value): ChoiceParamType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addChoices(p_obj: Item): ChoiceParamType;

    removeChoices(p_obj: Item): ChoiceParamType;

    getChoices(cb: kmf.KCallback<Item[]>): void;

    sizeOfChoices(): number;

    addConstraints(p_obj: AbstractConstraint): ChoiceParamType;

    removeConstraints(p_obj: AbstractConstraint): ChoiceParamType;

    getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void;

    sizeOfConstraints(): number;

}

export interface Component extends kmf.KObject, Instance {

    getName(): string;

    setName(p_obj: string): Component;

    getStarted(): boolean;

    setStarted(p_obj: boolean): Component;

    addOutputs(p_obj: OutputPort): Component;

    removeOutputs(p_obj: OutputPort): Component;

    getOutputs(cb: kmf.KCallback<OutputPort[]>): void;

    sizeOfOutputs(): number;

    addMetaData(p_obj: Value): Component;

    removeMetaData(p_obj: Value): Component;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: Dictionary): Component;

    removeDictionary(p_obj: Dictionary): Component;

    getDictionary(cb: kmf.KCallback<Dictionary[]>): void;

    sizeOfDictionary(): number;

    addInputs(p_obj: InputPort): Component;

    removeInputs(p_obj: InputPort): Component;

    getInputs(cb: kmf.KCallback<InputPort[]>): void;

    sizeOfInputs(): number;

    addTypeDefinition(p_obj: TypeDefinition): Component;

    removeTypeDefinition(p_obj: TypeDefinition): Component;

    getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void;

    sizeOfTypeDefinition(): number;

    addHost(p_obj: Node): Component;

    removeHost(p_obj: Node): Component;

    getHost(cb: kmf.KCallback<Node[]>): void;

    sizeOfHost(): number;

}

export interface ComponentType extends kmf.KObject, TypeDefinition {

    getName(): string;

    setName(p_obj: string): ComponentType;

    getDescription(): string;

    setDescription(p_obj: string): ComponentType;

    getRemote(): boolean;

    setRemote(p_obj: boolean): ComponentType;

    getVersion(): number;

    setVersion(p_obj: number): ComponentType;

    addInputTypes(p_obj: PortType): ComponentType;

    removeInputTypes(p_obj: PortType): ComponentType;

    getInputTypes(cb: kmf.KCallback<PortType[]>): void;

    sizeOfInputTypes(): number;

    addMetaData(p_obj: Value): ComponentType;

    removeMetaData(p_obj: Value): ComponentType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: DictionaryType): ComponentType;

    removeDictionary(p_obj: DictionaryType): ComponentType;

    getDictionary(cb: kmf.KCallback<DictionaryType[]>): void;

    sizeOfDictionary(): number;

    addDeployUnits(p_obj: DeployUnit): ComponentType;

    removeDeployUnits(p_obj: DeployUnit): ComponentType;

    getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void;

    sizeOfDeployUnits(): number;

    addOutputTypes(p_obj: PortType): ComponentType;

    removeOutputTypes(p_obj: PortType): ComponentType;

    getOutputTypes(cb: kmf.KCallback<PortType[]>): void;

    sizeOfOutputTypes(): number;

    addPreferedVersions(p_obj: PreferedVersion): ComponentType;

    removePreferedVersions(p_obj: PreferedVersion): ComponentType;

    getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void;

    sizeOfPreferedVersions(): number;

}

export interface DeployUnit extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): DeployUnit;

    getVersion(): string;

    setVersion(p_obj: string): DeployUnit;

    getPlatform(): string;

    setPlatform(p_obj: string): DeployUnit;

    addMetaData(p_obj: Value): DeployUnit;

    removeMetaData(p_obj: Value): DeployUnit;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface Dictionary extends kmf.KObject, Element {

    addMetaData(p_obj: Value): Dictionary;

    removeMetaData(p_obj: Value): Dictionary;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addParams(p_obj: Param): Dictionary;

    removeParams(p_obj: Param): Dictionary;

    getParams(cb: kmf.KCallback<Param[]>): void;

    sizeOfParams(): number;

}

export interface DictionaryType extends kmf.KObject, Element {

    addMetaData(p_obj: Value): DictionaryType;

    removeMetaData(p_obj: Value): DictionaryType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addParams(p_obj: ParamType): DictionaryType;

    removeParams(p_obj: ParamType): DictionaryType;

    getParams(cb: kmf.KCallback<ParamType[]>): void;

    sizeOfParams(): number;

}

export interface Element extends kmf.KObject {

    addMetaData(p_obj: Value): Element;

    removeMetaData(p_obj: Value): Element;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface FragmentDictionary extends kmf.KObject, Dictionary {

    getName(): string;

    setName(p_obj: string): FragmentDictionary;

    addMetaData(p_obj: Value): FragmentDictionary;

    removeMetaData(p_obj: Value): FragmentDictionary;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addParams(p_obj: Param): FragmentDictionary;

    removeParams(p_obj: Param): FragmentDictionary;

    getParams(cb: kmf.KCallback<Param[]>): void;

    sizeOfParams(): number;

}

export interface Group extends kmf.KObject, Instance {

    getName(): string;

    setName(p_obj: string): Group;

    getStarted(): boolean;

    setStarted(p_obj: boolean): Group;

    addMetaData(p_obj: Value): Group;

    removeMetaData(p_obj: Value): Group;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addNodes(p_obj: Node): Group;

    removeNodes(p_obj: Node): Group;

    getNodes(cb: kmf.KCallback<Node[]>): void;

    sizeOfNodes(): number;

    addDictionary(p_obj: Dictionary): Group;

    removeDictionary(p_obj: Dictionary): Group;

    getDictionary(cb: kmf.KCallback<Dictionary[]>): void;

    sizeOfDictionary(): number;

    addTypeDefinition(p_obj: TypeDefinition): Group;

    removeTypeDefinition(p_obj: TypeDefinition): Group;

    getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void;

    sizeOfTypeDefinition(): number;

    addFragmentDictionary(p_obj: FragmentDictionary): Group;

    removeFragmentDictionary(p_obj: FragmentDictionary): Group;

    getFragmentDictionary(cb: kmf.KCallback<FragmentDictionary[]>): void;

    sizeOfFragmentDictionary(): number;

}

export interface GroupType extends kmf.KObject, TypeDefinition {

    getName(): string;

    setName(p_obj: string): GroupType;

    getDescription(): string;

    setDescription(p_obj: string): GroupType;

    getRemote(): boolean;

    setRemote(p_obj: boolean): GroupType;

    getVersion(): number;

    setVersion(p_obj: number): GroupType;

    addMetaData(p_obj: Value): GroupType;

    removeMetaData(p_obj: Value): GroupType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: DictionaryType): GroupType;

    removeDictionary(p_obj: DictionaryType): GroupType;

    getDictionary(cb: kmf.KCallback<DictionaryType[]>): void;

    sizeOfDictionary(): number;

    addDeployUnits(p_obj: DeployUnit): GroupType;

    removeDeployUnits(p_obj: DeployUnit): GroupType;

    getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void;

    sizeOfDeployUnits(): number;

    addPreferedVersions(p_obj: PreferedVersion): GroupType;

    removePreferedVersions(p_obj: PreferedVersion): GroupType;

    getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void;

    sizeOfPreferedVersions(): number;

}

export interface InputPort extends kmf.KObject, Port {

    getName(): string;

    setName(p_obj: string): InputPort;

    addMetaData(p_obj: Value): InputPort;

    removeMetaData(p_obj: Value): InputPort;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addComponents(p_obj: Component): InputPort;

    removeComponents(p_obj: Component): InputPort;

    getComponents(cb: kmf.KCallback<Component[]>): void;

    sizeOfComponents(): number;

    addChannels(p_obj: Channel): InputPort;

    removeChannels(p_obj: Channel): InputPort;

    getChannels(cb: kmf.KCallback<Channel[]>): void;

    sizeOfChannels(): number;

    addType(p_obj: PortType): InputPort;

    removeType(p_obj: PortType): InputPort;

    getType(cb: kmf.KCallback<PortType[]>): void;

    sizeOfType(): number;

}

export interface Instance extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): Instance;

    getStarted(): boolean;

    setStarted(p_obj: boolean): Instance;

    addMetaData(p_obj: Value): Instance;

    removeMetaData(p_obj: Value): Instance;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: Dictionary): Instance;

    removeDictionary(p_obj: Dictionary): Instance;

    getDictionary(cb: kmf.KCallback<Dictionary[]>): void;

    sizeOfDictionary(): number;

    addTypeDefinition(p_obj: TypeDefinition): Instance;

    removeTypeDefinition(p_obj: TypeDefinition): Instance;

    getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void;

    sizeOfTypeDefinition(): number;

}

export interface Item extends kmf.KObject {

    getValue(): string;

    setValue(p_obj: string): Item;

}

export interface ListParam extends kmf.KObject, Param {

    getName(): string;

    setName(p_obj: string): ListParam;

    addMetaData(p_obj: Value): ListParam;

    removeMetaData(p_obj: Value): ListParam;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addValues(p_obj: Item): ListParam;

    removeValues(p_obj: Item): ListParam;

    getValues(cb: kmf.KCallback<Item[]>): void;

    sizeOfValues(): number;

    addType(p_obj: ParamType): ListParam;

    removeType(p_obj: ParamType): ListParam;

    getType(cb: kmf.KCallback<ParamType[]>): void;

    sizeOfType(): number;

}

export interface ListParamType extends kmf.KObject, ParamType {

    getFragment(): boolean;

    setFragment(p_obj: boolean): ListParamType;

    getName(): string;

    setName(p_obj: string): ListParamType;

    getDescription(): string;

    setDescription(p_obj: string): ListParamType;

    getRequired(): boolean;

    setRequired(p_obj: boolean): ListParamType;

    addMetaData(p_obj: Value): ListParamType;

    removeMetaData(p_obj: Value): ListParamType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDefault(p_obj: Item): ListParamType;

    removeDefault(p_obj: Item): ListParamType;

    getDefault(cb: kmf.KCallback<Item[]>): void;

    sizeOfDefault(): number;

    addConstraints(p_obj: AbstractConstraint): ListParamType;

    removeConstraints(p_obj: AbstractConstraint): ListParamType;

    getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void;

    sizeOfConstraints(): number;

}

export interface MaxConstraint extends kmf.KObject, AbstractConstraint {

    getExclusive(): boolean;

    setExclusive(p_obj: boolean): MaxConstraint;

    getValue(): number;

    setValue(p_obj: number): MaxConstraint;

    addMetaData(p_obj: Value): MaxConstraint;

    removeMetaData(p_obj: Value): MaxConstraint;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface MinConstraint extends kmf.KObject, AbstractConstraint {

    getExclusive(): boolean;

    setExclusive(p_obj: boolean): MinConstraint;

    getValue(): number;

    setValue(p_obj: number): MinConstraint;

    addMetaData(p_obj: Value): MinConstraint;

    removeMetaData(p_obj: Value): MinConstraint;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface Model extends kmf.KObject, Element {

    addMetaData(p_obj: Value): Model;

    removeMetaData(p_obj: Value): Model;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addNodes(p_obj: Node): Model;

    removeNodes(p_obj: Node): Model;

    getNodes(cb: kmf.KCallback<Node[]>): void;

    sizeOfNodes(): number;

    addChannels(p_obj: Channel): Model;

    removeChannels(p_obj: Channel): Model;

    getChannels(cb: kmf.KCallback<Channel[]>): void;

    sizeOfChannels(): number;

    addGroups(p_obj: Group): Model;

    removeGroups(p_obj: Group): Model;

    getGroups(cb: kmf.KCallback<Group[]>): void;

    sizeOfGroups(): number;

    addNamespaces(p_obj: Namespace): Model;

    removeNamespaces(p_obj: Namespace): Model;

    getNamespaces(cb: kmf.KCallback<Namespace[]>): void;

    sizeOfNamespaces(): number;

}

export interface MultilineConstraint extends kmf.KObject, AbstractConstraint {

    getValue(): boolean;

    setValue(p_obj: boolean): MultilineConstraint;

    addMetaData(p_obj: Value): MultilineConstraint;

    removeMetaData(p_obj: Value): MultilineConstraint;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface Namespace extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): Namespace;

    addMetaData(p_obj: Value): Namespace;

    removeMetaData(p_obj: Value): Namespace;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addTypeDefinitions(p_obj: TypeDefinition): Namespace;

    removeTypeDefinitions(p_obj: TypeDefinition): Namespace;

    getTypeDefinitions(cb: kmf.KCallback<TypeDefinition[]>): void;

    sizeOfTypeDefinitions(): number;

}

export interface Node extends kmf.KObject, Instance {

    getName(): string;

    setName(p_obj: string): Node;

    getStarted(): boolean;

    setStarted(p_obj: boolean): Node;

    addMetaData(p_obj: Value): Node;

    removeMetaData(p_obj: Value): Node;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addComponents(p_obj: Component): Node;

    removeComponents(p_obj: Component): Node;

    getComponents(cb: kmf.KCallback<Component[]>): void;

    sizeOfComponents(): number;

    addDictionary(p_obj: Dictionary): Node;

    removeDictionary(p_obj: Dictionary): Node;

    getDictionary(cb: kmf.KCallback<Dictionary[]>): void;

    sizeOfDictionary(): number;

    addTypeDefinition(p_obj: TypeDefinition): Node;

    removeTypeDefinition(p_obj: TypeDefinition): Node;

    getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void;

    sizeOfTypeDefinition(): number;

    addHost(p_obj: Node): Node;

    removeHost(p_obj: Node): Node;

    getHost(cb: kmf.KCallback<Node[]>): void;

    sizeOfHost(): number;

    addGroups(p_obj: Group): Node;

    removeGroups(p_obj: Group): Node;

    getGroups(cb: kmf.KCallback<Group[]>): void;

    sizeOfGroups(): number;

    addSubNodes(p_obj: Node): Node;

    removeSubNodes(p_obj: Node): Node;

    getSubNodes(cb: kmf.KCallback<Node[]>): void;

    sizeOfSubNodes(): number;

}

export interface NodeType extends kmf.KObject, TypeDefinition {

    getName(): string;

    setName(p_obj: string): NodeType;

    getDescription(): string;

    setDescription(p_obj: string): NodeType;

    getVersion(): number;

    setVersion(p_obj: number): NodeType;

    addMetaData(p_obj: Value): NodeType;

    removeMetaData(p_obj: Value): NodeType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: DictionaryType): NodeType;

    removeDictionary(p_obj: DictionaryType): NodeType;

    getDictionary(cb: kmf.KCallback<DictionaryType[]>): void;

    sizeOfDictionary(): number;

    addDeployUnits(p_obj: DeployUnit): NodeType;

    removeDeployUnits(p_obj: DeployUnit): NodeType;

    getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void;

    sizeOfDeployUnits(): number;

    addPreferedVersions(p_obj: PreferedVersion): NodeType;

    removePreferedVersions(p_obj: PreferedVersion): NodeType;

    getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void;

    sizeOfPreferedVersions(): number;

}

export interface NumberParam extends kmf.KObject, Param {

    getName(): string;

    setName(p_obj: string): NumberParam;

    getValue(): string;

    setValue(p_obj: string): NumberParam;

    addMetaData(p_obj: Value): NumberParam;

    removeMetaData(p_obj: Value): NumberParam;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addType(p_obj: ParamType): NumberParam;

    removeType(p_obj: ParamType): NumberParam;

    getType(cb: kmf.KCallback<ParamType[]>): void;

    sizeOfType(): number;

}

export interface NumberParamType extends kmf.KObject, ParamType {

    getDefault(): string;

    setDefault(p_obj: string): NumberParamType;

    getFragment(): boolean;

    setFragment(p_obj: boolean): NumberParamType;

    getName(): string;

    setName(p_obj: string): NumberParamType;

    getDescription(): string;

    setDescription(p_obj: string): NumberParamType;

    getType(): NumberType;

    setType(p_obj: NumberType): NumberParamType;

    getRequired(): boolean;

    setRequired(p_obj: boolean): NumberParamType;

    addMetaData(p_obj: Value): NumberParamType;

    removeMetaData(p_obj: Value): NumberParamType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addConstraints(p_obj: AbstractConstraint): NumberParamType;

    removeConstraints(p_obj: AbstractConstraint): NumberParamType;

    getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void;

    sizeOfConstraints(): number;

}

export interface NumberType extends kmf.meta.KLiteral {

}

export interface OutputPort extends kmf.KObject, Port {

    getName(): string;

    setName(p_obj: string): OutputPort;

    addMetaData(p_obj: Value): OutputPort;

    removeMetaData(p_obj: Value): OutputPort;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addComponents(p_obj: Component): OutputPort;

    removeComponents(p_obj: Component): OutputPort;

    getComponents(cb: kmf.KCallback<Component[]>): void;

    sizeOfComponents(): number;

    addChannels(p_obj: Channel): OutputPort;

    removeChannels(p_obj: Channel): OutputPort;

    getChannels(cb: kmf.KCallback<Channel[]>): void;

    sizeOfChannels(): number;

    addType(p_obj: PortType): OutputPort;

    removeType(p_obj: PortType): OutputPort;

    getType(cb: kmf.KCallback<PortType[]>): void;

    sizeOfType(): number;

}

export interface Param extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): Param;

    addMetaData(p_obj: Value): Param;

    removeMetaData(p_obj: Value): Param;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addType(p_obj: ParamType): Param;

    removeType(p_obj: ParamType): Param;

    getType(cb: kmf.KCallback<ParamType[]>): void;

    sizeOfType(): number;

}

export interface ParamType extends kmf.KObject, Element {

    getFragment(): boolean;

    setFragment(p_obj: boolean): ParamType;

    getName(): string;

    setName(p_obj: string): ParamType;

    getDescription(): string;

    setDescription(p_obj: string): ParamType;

    getRequired(): boolean;

    setRequired(p_obj: boolean): ParamType;

    addMetaData(p_obj: Value): ParamType;

    removeMetaData(p_obj: Value): ParamType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addConstraints(p_obj: AbstractConstraint): ParamType;

    removeConstraints(p_obj: AbstractConstraint): ParamType;

    getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void;

    sizeOfConstraints(): number;

}

export interface Port extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): Port;

    addMetaData(p_obj: Value): Port;

    removeMetaData(p_obj: Value): Port;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addComponents(p_obj: Component): Port;

    removeComponents(p_obj: Component): Port;

    getComponents(cb: kmf.KCallback<Component[]>): void;

    sizeOfComponents(): number;

    addChannels(p_obj: Channel): Port;

    removeChannels(p_obj: Channel): Port;

    getChannels(cb: kmf.KCallback<Channel[]>): void;

    sizeOfChannels(): number;

    addType(p_obj: PortType): Port;

    removeType(p_obj: PortType): Port;

    getType(cb: kmf.KCallback<PortType[]>): void;

    sizeOfType(): number;

}

export interface PortType extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): PortType;

    addMetaData(p_obj: Value): PortType;

    removeMetaData(p_obj: Value): PortType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addProtocol(p_obj: Value): PortType;

    removeProtocol(p_obj: Value): PortType;

    getProtocol(cb: kmf.KCallback<Value[]>): void;

    sizeOfProtocol(): number;

}

export interface PreferedVersion extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): PreferedVersion;

    getVersion(): string;

    setVersion(p_obj: string): PreferedVersion;

    getPlatform(): string;

    setPlatform(p_obj: string): PreferedVersion;

    addMetaData(p_obj: Value): PreferedVersion;

    removeMetaData(p_obj: Value): PreferedVersion;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export interface StringParam extends kmf.KObject, Param {

    getName(): string;

    setName(p_obj: string): StringParam;

    getValue(): string;

    setValue(p_obj: string): StringParam;

    addMetaData(p_obj: Value): StringParam;

    removeMetaData(p_obj: Value): StringParam;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addType(p_obj: ParamType): StringParam;

    removeType(p_obj: ParamType): StringParam;

    getType(cb: kmf.KCallback<ParamType[]>): void;

    sizeOfType(): number;

}

export interface StringParamType extends kmf.KObject, ParamType {

    getDefault(): string;

    setDefault(p_obj: string): StringParamType;

    getFragment(): boolean;

    setFragment(p_obj: boolean): StringParamType;

    getName(): string;

    setName(p_obj: string): StringParamType;

    getDescription(): string;

    setDescription(p_obj: string): StringParamType;

    getRequired(): boolean;

    setRequired(p_obj: boolean): StringParamType;

    addMetaData(p_obj: Value): StringParamType;

    removeMetaData(p_obj: Value): StringParamType;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addConstraints(p_obj: AbstractConstraint): StringParamType;

    removeConstraints(p_obj: AbstractConstraint): StringParamType;

    getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void;

    sizeOfConstraints(): number;

}

export interface TypeDefinition extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): TypeDefinition;

    getDescription(): string;

    setDescription(p_obj: string): TypeDefinition;

    getVersion(): number;

    setVersion(p_obj: number): TypeDefinition;

    addMetaData(p_obj: Value): TypeDefinition;

    removeMetaData(p_obj: Value): TypeDefinition;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

    addDictionary(p_obj: DictionaryType): TypeDefinition;

    removeDictionary(p_obj: DictionaryType): TypeDefinition;

    getDictionary(cb: kmf.KCallback<DictionaryType[]>): void;

    sizeOfDictionary(): number;

    addDeployUnits(p_obj: DeployUnit): TypeDefinition;

    removeDeployUnits(p_obj: DeployUnit): TypeDefinition;

    getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void;

    sizeOfDeployUnits(): number;

    addPreferedVersions(p_obj: PreferedVersion): TypeDefinition;

    removePreferedVersions(p_obj: PreferedVersion): TypeDefinition;

    getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void;

    sizeOfPreferedVersions(): number;

}

export interface Value extends kmf.KObject, Element {

    getName(): string;

    setName(p_obj: string): Value;

    getValue(): string;

    setValue(p_obj: string): Value;

    addMetaData(p_obj: Value): Value;

    removeMetaData(p_obj: Value): Value;

    getMetaData(cb: kmf.KCallback<Value[]>): void;

    sizeOfMetaData(): number;

}

export namespace impl {
    export class AbstractConstraintImpl extends kmf.abs.AbstractKObject implements AbstractConstraint {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public addMetaData(p_obj: Value): AbstractConstraint {
            this.add(meta.MetaAbstractConstraint.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): AbstractConstraint {
            this.remove(meta.MetaAbstractConstraint.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaAbstractConstraint.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaAbstractConstraint.REL_METADATA);
        }

    }

    export class BooleanParamImpl extends kmf.abs.AbstractKObject implements BooleanParam {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaBooleanParam.ATT_NAME);
        }

        public setName(p_obj: string): BooleanParam {
            this.set(meta.MetaBooleanParam.ATT_NAME, p_obj);
            return this;
        }

        public getValue(): boolean {
            return <boolean>this.get(meta.MetaBooleanParam.ATT_VALUE);
        }

        public setValue(p_obj: boolean): BooleanParam {
            this.set(meta.MetaBooleanParam.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): BooleanParam {
            this.add(meta.MetaBooleanParam.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): BooleanParam {
            this.remove(meta.MetaBooleanParam.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaBooleanParam.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaBooleanParam.REL_METADATA);
        }

        public addType(p_obj: ParamType): BooleanParam {
            this.add(meta.MetaBooleanParam.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: ParamType): BooleanParam {
            this.remove(meta.MetaBooleanParam.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<ParamType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaBooleanParam.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: ParamType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <ParamType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaBooleanParam.REL_TYPE);
        }

    }

    export class BooleanParamTypeImpl extends kmf.abs.AbstractKObject implements BooleanParamType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getDefault(): boolean {
            return <boolean>this.get(meta.MetaBooleanParamType.ATT_DEFAULT);
        }

        public setDefault(p_obj: boolean): BooleanParamType {
            this.set(meta.MetaBooleanParamType.ATT_DEFAULT, p_obj);
            return this;
        }

        public getFragment(): boolean {
            return <boolean>this.get(meta.MetaBooleanParamType.ATT_FRAGMENT);
        }

        public setFragment(p_obj: boolean): BooleanParamType {
            this.set(meta.MetaBooleanParamType.ATT_FRAGMENT, p_obj);
            return this;
        }

        public getName(): string {
            return <string>this.get(meta.MetaBooleanParamType.ATT_NAME);
        }

        public setName(p_obj: string): BooleanParamType {
            this.set(meta.MetaBooleanParamType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaBooleanParamType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): BooleanParamType {
            this.set(meta.MetaBooleanParamType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRequired(): boolean {
            return <boolean>this.get(meta.MetaBooleanParamType.ATT_REQUIRED);
        }

        public setRequired(p_obj: boolean): BooleanParamType {
            this.set(meta.MetaBooleanParamType.ATT_REQUIRED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): BooleanParamType {
            this.add(meta.MetaBooleanParamType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): BooleanParamType {
            this.remove(meta.MetaBooleanParamType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaBooleanParamType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaBooleanParamType.REL_METADATA);
        }

        public addConstraints(p_obj: AbstractConstraint): BooleanParamType {
            this.add(meta.MetaBooleanParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public removeConstraints(p_obj: AbstractConstraint): BooleanParamType {
            this.remove(meta.MetaBooleanParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaBooleanParamType.REL_CONSTRAINTS,  (kObjects : kmf.KObject[]) => {
                var casted: AbstractConstraint[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <AbstractConstraint>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfConstraints(): number {
            return this.size(meta.MetaBooleanParamType.REL_CONSTRAINTS);
        }

    }

    export class ChannelImpl extends kmf.abs.AbstractKObject implements Channel {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaChannel.ATT_NAME);
        }

        public setName(p_obj: string): Channel {
            this.set(meta.MetaChannel.ATT_NAME, p_obj);
            return this;
        }

        public getStarted(): boolean {
            return <boolean>this.get(meta.MetaChannel.ATT_STARTED);
        }

        public setStarted(p_obj: boolean): Channel {
            this.set(meta.MetaChannel.ATT_STARTED, p_obj);
            return this;
        }

        public addOutputs(p_obj: OutputPort): Channel {
            this.add(meta.MetaChannel.REL_OUTPUTS, p_obj);
            return this;
        }

        public removeOutputs(p_obj: OutputPort): Channel {
            this.remove(meta.MetaChannel.REL_OUTPUTS, p_obj);
            return this;
        }

        public getOutputs(cb: kmf.KCallback<OutputPort[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannel.REL_OUTPUTS,  (kObjects : kmf.KObject[]) => {
                var casted: OutputPort[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <OutputPort>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfOutputs(): number {
            return this.size(meta.MetaChannel.REL_OUTPUTS);
        }

        public addMetaData(p_obj: Value): Channel {
            this.add(meta.MetaChannel.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Channel {
            this.remove(meta.MetaChannel.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannel.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaChannel.REL_METADATA);
        }

        public addDictionary(p_obj: Dictionary): Channel {
            this.add(meta.MetaChannel.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: Dictionary): Channel {
            this.remove(meta.MetaChannel.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<Dictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannel.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: Dictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Dictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaChannel.REL_DICTIONARY);
        }

        public addInputs(p_obj: InputPort): Channel {
            this.add(meta.MetaChannel.REL_INPUTS, p_obj);
            return this;
        }

        public removeInputs(p_obj: InputPort): Channel {
            this.remove(meta.MetaChannel.REL_INPUTS, p_obj);
            return this;
        }

        public getInputs(cb: kmf.KCallback<InputPort[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannel.REL_INPUTS,  (kObjects : kmf.KObject[]) => {
                var casted: InputPort[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <InputPort>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfInputs(): number {
            return this.size(meta.MetaChannel.REL_INPUTS);
        }

        public addTypeDefinition(p_obj: TypeDefinition): Channel {
            this.add(meta.MetaChannel.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public removeTypeDefinition(p_obj: TypeDefinition): Channel {
            this.remove(meta.MetaChannel.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannel.REL_TYPEDEFINITION,  (kObjects : kmf.KObject[]) => {
                var casted: TypeDefinition[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <TypeDefinition>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfTypeDefinition(): number {
            return this.size(meta.MetaChannel.REL_TYPEDEFINITION);
        }

        public addFragmentDictionary(p_obj: FragmentDictionary): Channel {
            this.add(meta.MetaChannel.REL_FRAGMENTDICTIONARY, p_obj);
            return this;
        }

        public removeFragmentDictionary(p_obj: FragmentDictionary): Channel {
            this.remove(meta.MetaChannel.REL_FRAGMENTDICTIONARY, p_obj);
            return this;
        }

        public getFragmentDictionary(cb: kmf.KCallback<FragmentDictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannel.REL_FRAGMENTDICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: FragmentDictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <FragmentDictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfFragmentDictionary(): number {
            return this.size(meta.MetaChannel.REL_FRAGMENTDICTIONARY);
        }

    }

    export class ChannelTypeImpl extends kmf.abs.AbstractKObject implements ChannelType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaChannelType.ATT_NAME);
        }

        public setName(p_obj: string): ChannelType {
            this.set(meta.MetaChannelType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaChannelType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): ChannelType {
            this.set(meta.MetaChannelType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRemote(): boolean {
            return <boolean>this.get(meta.MetaChannelType.ATT_REMOTE);
        }

        public setRemote(p_obj: boolean): ChannelType {
            this.set(meta.MetaChannelType.ATT_REMOTE, p_obj);
            return this;
        }

        public getFragmentable(): boolean {
            return <boolean>this.get(meta.MetaChannelType.ATT_FRAGMENTABLE);
        }

        public setFragmentable(p_obj: boolean): ChannelType {
            this.set(meta.MetaChannelType.ATT_FRAGMENTABLE, p_obj);
            return this;
        }

        public getVersion(): number {
            return <number>this.get(meta.MetaChannelType.ATT_VERSION);
        }

        public setVersion(p_obj: number): ChannelType {
            this.set(meta.MetaChannelType.ATT_VERSION, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): ChannelType {
            this.add(meta.MetaChannelType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): ChannelType {
            this.remove(meta.MetaChannelType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannelType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaChannelType.REL_METADATA);
        }

        public addDictionary(p_obj: DictionaryType): ChannelType {
            this.add(meta.MetaChannelType.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: DictionaryType): ChannelType {
            this.remove(meta.MetaChannelType.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<DictionaryType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannelType.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: DictionaryType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DictionaryType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaChannelType.REL_DICTIONARY);
        }

        public addDeployUnits(p_obj: DeployUnit): ChannelType {
            this.add(meta.MetaChannelType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public removeDeployUnits(p_obj: DeployUnit): ChannelType {
            this.remove(meta.MetaChannelType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannelType.REL_DEPLOYUNITS,  (kObjects : kmf.KObject[]) => {
                var casted: DeployUnit[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DeployUnit>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDeployUnits(): number {
            return this.size(meta.MetaChannelType.REL_DEPLOYUNITS);
        }

        public addPreferedVersions(p_obj: PreferedVersion): ChannelType {
            this.add(meta.MetaChannelType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public removePreferedVersions(p_obj: PreferedVersion): ChannelType {
            this.remove(meta.MetaChannelType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChannelType.REL_PREFEREDVERSIONS,  (kObjects : kmf.KObject[]) => {
                var casted: PreferedVersion[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PreferedVersion>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfPreferedVersions(): number {
            return this.size(meta.MetaChannelType.REL_PREFEREDVERSIONS);
        }

    }

    export class ChoiceParamTypeImpl extends kmf.abs.AbstractKObject implements ChoiceParamType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getDefault(): string {
            return <string>this.get(meta.MetaChoiceParamType.ATT_DEFAULT);
        }

        public setDefault(p_obj: string): ChoiceParamType {
            this.set(meta.MetaChoiceParamType.ATT_DEFAULT, p_obj);
            return this;
        }

        public getFragment(): boolean {
            return <boolean>this.get(meta.MetaChoiceParamType.ATT_FRAGMENT);
        }

        public setFragment(p_obj: boolean): ChoiceParamType {
            this.set(meta.MetaChoiceParamType.ATT_FRAGMENT, p_obj);
            return this;
        }

        public getName(): string {
            return <string>this.get(meta.MetaChoiceParamType.ATT_NAME);
        }

        public setName(p_obj: string): ChoiceParamType {
            this.set(meta.MetaChoiceParamType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaChoiceParamType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): ChoiceParamType {
            this.set(meta.MetaChoiceParamType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRequired(): boolean {
            return <boolean>this.get(meta.MetaChoiceParamType.ATT_REQUIRED);
        }

        public setRequired(p_obj: boolean): ChoiceParamType {
            this.set(meta.MetaChoiceParamType.ATT_REQUIRED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): ChoiceParamType {
            this.add(meta.MetaChoiceParamType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): ChoiceParamType {
            this.remove(meta.MetaChoiceParamType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChoiceParamType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaChoiceParamType.REL_METADATA);
        }

        public addChoices(p_obj: Item): ChoiceParamType {
            this.add(meta.MetaChoiceParamType.REL_CHOICES, p_obj);
            return this;
        }

        public removeChoices(p_obj: Item): ChoiceParamType {
            this.remove(meta.MetaChoiceParamType.REL_CHOICES, p_obj);
            return this;
        }

        public getChoices(cb: kmf.KCallback<Item[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChoiceParamType.REL_CHOICES,  (kObjects : kmf.KObject[]) => {
                var casted: Item[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Item>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfChoices(): number {
            return this.size(meta.MetaChoiceParamType.REL_CHOICES);
        }

        public addConstraints(p_obj: AbstractConstraint): ChoiceParamType {
            this.add(meta.MetaChoiceParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public removeConstraints(p_obj: AbstractConstraint): ChoiceParamType {
            this.remove(meta.MetaChoiceParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaChoiceParamType.REL_CONSTRAINTS,  (kObjects : kmf.KObject[]) => {
                var casted: AbstractConstraint[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <AbstractConstraint>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfConstraints(): number {
            return this.size(meta.MetaChoiceParamType.REL_CONSTRAINTS);
        }

    }

    export class ComponentImpl extends kmf.abs.AbstractKObject implements Component {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaComponent.ATT_NAME);
        }

        public setName(p_obj: string): Component {
            this.set(meta.MetaComponent.ATT_NAME, p_obj);
            return this;
        }

        public getStarted(): boolean {
            return <boolean>this.get(meta.MetaComponent.ATT_STARTED);
        }

        public setStarted(p_obj: boolean): Component {
            this.set(meta.MetaComponent.ATT_STARTED, p_obj);
            return this;
        }

        public addOutputs(p_obj: OutputPort): Component {
            this.add(meta.MetaComponent.REL_OUTPUTS, p_obj);
            return this;
        }

        public removeOutputs(p_obj: OutputPort): Component {
            this.remove(meta.MetaComponent.REL_OUTPUTS, p_obj);
            return this;
        }

        public getOutputs(cb: kmf.KCallback<OutputPort[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponent.REL_OUTPUTS,  (kObjects : kmf.KObject[]) => {
                var casted: OutputPort[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <OutputPort>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfOutputs(): number {
            return this.size(meta.MetaComponent.REL_OUTPUTS);
        }

        public addMetaData(p_obj: Value): Component {
            this.add(meta.MetaComponent.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Component {
            this.remove(meta.MetaComponent.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponent.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaComponent.REL_METADATA);
        }

        public addDictionary(p_obj: Dictionary): Component {
            this.add(meta.MetaComponent.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: Dictionary): Component {
            this.remove(meta.MetaComponent.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<Dictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponent.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: Dictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Dictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaComponent.REL_DICTIONARY);
        }

        public addInputs(p_obj: InputPort): Component {
            this.add(meta.MetaComponent.REL_INPUTS, p_obj);
            return this;
        }

        public removeInputs(p_obj: InputPort): Component {
            this.remove(meta.MetaComponent.REL_INPUTS, p_obj);
            return this;
        }

        public getInputs(cb: kmf.KCallback<InputPort[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponent.REL_INPUTS,  (kObjects : kmf.KObject[]) => {
                var casted: InputPort[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <InputPort>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfInputs(): number {
            return this.size(meta.MetaComponent.REL_INPUTS);
        }

        public addTypeDefinition(p_obj: TypeDefinition): Component {
            this.add(meta.MetaComponent.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public removeTypeDefinition(p_obj: TypeDefinition): Component {
            this.remove(meta.MetaComponent.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponent.REL_TYPEDEFINITION,  (kObjects : kmf.KObject[]) => {
                var casted: TypeDefinition[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <TypeDefinition>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfTypeDefinition(): number {
            return this.size(meta.MetaComponent.REL_TYPEDEFINITION);
        }

        public addHost(p_obj: Node): Component {
            this.add(meta.MetaComponent.REL_HOST, p_obj);
            return this;
        }

        public removeHost(p_obj: Node): Component {
            this.remove(meta.MetaComponent.REL_HOST, p_obj);
            return this;
        }

        public getHost(cb: kmf.KCallback<Node[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponent.REL_HOST,  (kObjects : kmf.KObject[]) => {
                var casted: Node[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Node>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfHost(): number {
            return this.size(meta.MetaComponent.REL_HOST);
        }

    }

    export class ComponentTypeImpl extends kmf.abs.AbstractKObject implements ComponentType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaComponentType.ATT_NAME);
        }

        public setName(p_obj: string): ComponentType {
            this.set(meta.MetaComponentType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaComponentType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): ComponentType {
            this.set(meta.MetaComponentType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRemote(): boolean {
            return <boolean>this.get(meta.MetaComponentType.ATT_REMOTE);
        }

        public setRemote(p_obj: boolean): ComponentType {
            this.set(meta.MetaComponentType.ATT_REMOTE, p_obj);
            return this;
        }

        public getVersion(): number {
            return <number>this.get(meta.MetaComponentType.ATT_VERSION);
        }

        public setVersion(p_obj: number): ComponentType {
            this.set(meta.MetaComponentType.ATT_VERSION, p_obj);
            return this;
        }

        public addInputTypes(p_obj: PortType): ComponentType {
            this.add(meta.MetaComponentType.REL_INPUTTYPES, p_obj);
            return this;
        }

        public removeInputTypes(p_obj: PortType): ComponentType {
            this.remove(meta.MetaComponentType.REL_INPUTTYPES, p_obj);
            return this;
        }

        public getInputTypes(cb: kmf.KCallback<PortType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponentType.REL_INPUTTYPES,  (kObjects : kmf.KObject[]) => {
                var casted: PortType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PortType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfInputTypes(): number {
            return this.size(meta.MetaComponentType.REL_INPUTTYPES);
        }

        public addMetaData(p_obj: Value): ComponentType {
            this.add(meta.MetaComponentType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): ComponentType {
            this.remove(meta.MetaComponentType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponentType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaComponentType.REL_METADATA);
        }

        public addDictionary(p_obj: DictionaryType): ComponentType {
            this.add(meta.MetaComponentType.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: DictionaryType): ComponentType {
            this.remove(meta.MetaComponentType.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<DictionaryType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponentType.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: DictionaryType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DictionaryType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaComponentType.REL_DICTIONARY);
        }

        public addDeployUnits(p_obj: DeployUnit): ComponentType {
            this.add(meta.MetaComponentType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public removeDeployUnits(p_obj: DeployUnit): ComponentType {
            this.remove(meta.MetaComponentType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponentType.REL_DEPLOYUNITS,  (kObjects : kmf.KObject[]) => {
                var casted: DeployUnit[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DeployUnit>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDeployUnits(): number {
            return this.size(meta.MetaComponentType.REL_DEPLOYUNITS);
        }

        public addOutputTypes(p_obj: PortType): ComponentType {
            this.add(meta.MetaComponentType.REL_OUTPUTTYPES, p_obj);
            return this;
        }

        public removeOutputTypes(p_obj: PortType): ComponentType {
            this.remove(meta.MetaComponentType.REL_OUTPUTTYPES, p_obj);
            return this;
        }

        public getOutputTypes(cb: kmf.KCallback<PortType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponentType.REL_OUTPUTTYPES,  (kObjects : kmf.KObject[]) => {
                var casted: PortType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PortType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfOutputTypes(): number {
            return this.size(meta.MetaComponentType.REL_OUTPUTTYPES);
        }

        public addPreferedVersions(p_obj: PreferedVersion): ComponentType {
            this.add(meta.MetaComponentType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public removePreferedVersions(p_obj: PreferedVersion): ComponentType {
            this.remove(meta.MetaComponentType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaComponentType.REL_PREFEREDVERSIONS,  (kObjects : kmf.KObject[]) => {
                var casted: PreferedVersion[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PreferedVersion>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfPreferedVersions(): number {
            return this.size(meta.MetaComponentType.REL_PREFEREDVERSIONS);
        }

    }

    export class DeployUnitImpl extends kmf.abs.AbstractKObject implements DeployUnit {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaDeployUnit.ATT_NAME);
        }

        public setName(p_obj: string): DeployUnit {
            this.set(meta.MetaDeployUnit.ATT_NAME, p_obj);
            return this;
        }

        public getVersion(): string {
            return <string>this.get(meta.MetaDeployUnit.ATT_VERSION);
        }

        public setVersion(p_obj: string): DeployUnit {
            this.set(meta.MetaDeployUnit.ATT_VERSION, p_obj);
            return this;
        }

        public getPlatform(): string {
            return <string>this.get(meta.MetaDeployUnit.ATT_PLATFORM);
        }

        public setPlatform(p_obj: string): DeployUnit {
            this.set(meta.MetaDeployUnit.ATT_PLATFORM, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): DeployUnit {
            this.add(meta.MetaDeployUnit.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): DeployUnit {
            this.remove(meta.MetaDeployUnit.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaDeployUnit.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaDeployUnit.REL_METADATA);
        }

    }

    export class DictionaryImpl extends kmf.abs.AbstractKObject implements Dictionary {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public addMetaData(p_obj: Value): Dictionary {
            this.add(meta.MetaDictionary.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Dictionary {
            this.remove(meta.MetaDictionary.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaDictionary.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaDictionary.REL_METADATA);
        }

        public addParams(p_obj: Param): Dictionary {
            this.add(meta.MetaDictionary.REL_PARAMS, p_obj);
            return this;
        }

        public removeParams(p_obj: Param): Dictionary {
            this.remove(meta.MetaDictionary.REL_PARAMS, p_obj);
            return this;
        }

        public getParams(cb: kmf.KCallback<Param[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaDictionary.REL_PARAMS,  (kObjects : kmf.KObject[]) => {
                var casted: Param[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Param>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfParams(): number {
            return this.size(meta.MetaDictionary.REL_PARAMS);
        }

    }

    export class DictionaryTypeImpl extends kmf.abs.AbstractKObject implements DictionaryType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public addMetaData(p_obj: Value): DictionaryType {
            this.add(meta.MetaDictionaryType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): DictionaryType {
            this.remove(meta.MetaDictionaryType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaDictionaryType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaDictionaryType.REL_METADATA);
        }

        public addParams(p_obj: ParamType): DictionaryType {
            this.add(meta.MetaDictionaryType.REL_PARAMS, p_obj);
            return this;
        }

        public removeParams(p_obj: ParamType): DictionaryType {
            this.remove(meta.MetaDictionaryType.REL_PARAMS, p_obj);
            return this;
        }

        public getParams(cb: kmf.KCallback<ParamType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaDictionaryType.REL_PARAMS,  (kObjects : kmf.KObject[]) => {
                var casted: ParamType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <ParamType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfParams(): number {
            return this.size(meta.MetaDictionaryType.REL_PARAMS);
        }

    }

    export class ElementImpl extends kmf.abs.AbstractKObject implements Element {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public addMetaData(p_obj: Value): Element {
            this.add(meta.MetaElement.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Element {
            this.remove(meta.MetaElement.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaElement.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaElement.REL_METADATA);
        }

    }

    export class FragmentDictionaryImpl extends kmf.abs.AbstractKObject implements FragmentDictionary {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaFragmentDictionary.ATT_NAME);
        }

        public setName(p_obj: string): FragmentDictionary {
            this.set(meta.MetaFragmentDictionary.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): FragmentDictionary {
            this.add(meta.MetaFragmentDictionary.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): FragmentDictionary {
            this.remove(meta.MetaFragmentDictionary.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaFragmentDictionary.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaFragmentDictionary.REL_METADATA);
        }

        public addParams(p_obj: Param): FragmentDictionary {
            this.add(meta.MetaFragmentDictionary.REL_PARAMS, p_obj);
            return this;
        }

        public removeParams(p_obj: Param): FragmentDictionary {
            this.remove(meta.MetaFragmentDictionary.REL_PARAMS, p_obj);
            return this;
        }

        public getParams(cb: kmf.KCallback<Param[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaFragmentDictionary.REL_PARAMS,  (kObjects : kmf.KObject[]) => {
                var casted: Param[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Param>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfParams(): number {
            return this.size(meta.MetaFragmentDictionary.REL_PARAMS);
        }

    }

    export class GroupImpl extends kmf.abs.AbstractKObject implements Group {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaGroup.ATT_NAME);
        }

        public setName(p_obj: string): Group {
            this.set(meta.MetaGroup.ATT_NAME, p_obj);
            return this;
        }

        public getStarted(): boolean {
            return <boolean>this.get(meta.MetaGroup.ATT_STARTED);
        }

        public setStarted(p_obj: boolean): Group {
            this.set(meta.MetaGroup.ATT_STARTED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Group {
            this.add(meta.MetaGroup.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Group {
            this.remove(meta.MetaGroup.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroup.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaGroup.REL_METADATA);
        }

        public addNodes(p_obj: Node): Group {
            this.add(meta.MetaGroup.REL_NODES, p_obj);
            return this;
        }

        public removeNodes(p_obj: Node): Group {
            this.remove(meta.MetaGroup.REL_NODES, p_obj);
            return this;
        }

        public getNodes(cb: kmf.KCallback<Node[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroup.REL_NODES,  (kObjects : kmf.KObject[]) => {
                var casted: Node[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Node>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfNodes(): number {
            return this.size(meta.MetaGroup.REL_NODES);
        }

        public addDictionary(p_obj: Dictionary): Group {
            this.add(meta.MetaGroup.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: Dictionary): Group {
            this.remove(meta.MetaGroup.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<Dictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroup.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: Dictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Dictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaGroup.REL_DICTIONARY);
        }

        public addTypeDefinition(p_obj: TypeDefinition): Group {
            this.add(meta.MetaGroup.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public removeTypeDefinition(p_obj: TypeDefinition): Group {
            this.remove(meta.MetaGroup.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroup.REL_TYPEDEFINITION,  (kObjects : kmf.KObject[]) => {
                var casted: TypeDefinition[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <TypeDefinition>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfTypeDefinition(): number {
            return this.size(meta.MetaGroup.REL_TYPEDEFINITION);
        }

        public addFragmentDictionary(p_obj: FragmentDictionary): Group {
            this.add(meta.MetaGroup.REL_FRAGMENTDICTIONARY, p_obj);
            return this;
        }

        public removeFragmentDictionary(p_obj: FragmentDictionary): Group {
            this.remove(meta.MetaGroup.REL_FRAGMENTDICTIONARY, p_obj);
            return this;
        }

        public getFragmentDictionary(cb: kmf.KCallback<FragmentDictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroup.REL_FRAGMENTDICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: FragmentDictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <FragmentDictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfFragmentDictionary(): number {
            return this.size(meta.MetaGroup.REL_FRAGMENTDICTIONARY);
        }

    }

    export class GroupTypeImpl extends kmf.abs.AbstractKObject implements GroupType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaGroupType.ATT_NAME);
        }

        public setName(p_obj: string): GroupType {
            this.set(meta.MetaGroupType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaGroupType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): GroupType {
            this.set(meta.MetaGroupType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRemote(): boolean {
            return <boolean>this.get(meta.MetaGroupType.ATT_REMOTE);
        }

        public setRemote(p_obj: boolean): GroupType {
            this.set(meta.MetaGroupType.ATT_REMOTE, p_obj);
            return this;
        }

        public getVersion(): number {
            return <number>this.get(meta.MetaGroupType.ATT_VERSION);
        }

        public setVersion(p_obj: number): GroupType {
            this.set(meta.MetaGroupType.ATT_VERSION, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): GroupType {
            this.add(meta.MetaGroupType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): GroupType {
            this.remove(meta.MetaGroupType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroupType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaGroupType.REL_METADATA);
        }

        public addDictionary(p_obj: DictionaryType): GroupType {
            this.add(meta.MetaGroupType.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: DictionaryType): GroupType {
            this.remove(meta.MetaGroupType.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<DictionaryType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroupType.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: DictionaryType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DictionaryType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaGroupType.REL_DICTIONARY);
        }

        public addDeployUnits(p_obj: DeployUnit): GroupType {
            this.add(meta.MetaGroupType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public removeDeployUnits(p_obj: DeployUnit): GroupType {
            this.remove(meta.MetaGroupType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroupType.REL_DEPLOYUNITS,  (kObjects : kmf.KObject[]) => {
                var casted: DeployUnit[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DeployUnit>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDeployUnits(): number {
            return this.size(meta.MetaGroupType.REL_DEPLOYUNITS);
        }

        public addPreferedVersions(p_obj: PreferedVersion): GroupType {
            this.add(meta.MetaGroupType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public removePreferedVersions(p_obj: PreferedVersion): GroupType {
            this.remove(meta.MetaGroupType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaGroupType.REL_PREFEREDVERSIONS,  (kObjects : kmf.KObject[]) => {
                var casted: PreferedVersion[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PreferedVersion>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfPreferedVersions(): number {
            return this.size(meta.MetaGroupType.REL_PREFEREDVERSIONS);
        }

    }

    export class InputPortImpl extends kmf.abs.AbstractKObject implements InputPort {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaInputPort.ATT_NAME);
        }

        public setName(p_obj: string): InputPort {
            this.set(meta.MetaInputPort.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): InputPort {
            this.add(meta.MetaInputPort.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): InputPort {
            this.remove(meta.MetaInputPort.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInputPort.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaInputPort.REL_METADATA);
        }

        public addComponents(p_obj: Component): InputPort {
            this.add(meta.MetaInputPort.REL_COMPONENTS, p_obj);
            return this;
        }

        public removeComponents(p_obj: Component): InputPort {
            this.remove(meta.MetaInputPort.REL_COMPONENTS, p_obj);
            return this;
        }

        public getComponents(cb: kmf.KCallback<Component[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInputPort.REL_COMPONENTS,  (kObjects : kmf.KObject[]) => {
                var casted: Component[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Component>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfComponents(): number {
            return this.size(meta.MetaInputPort.REL_COMPONENTS);
        }

        public addChannels(p_obj: Channel): InputPort {
            this.add(meta.MetaInputPort.REL_CHANNELS, p_obj);
            return this;
        }

        public removeChannels(p_obj: Channel): InputPort {
            this.remove(meta.MetaInputPort.REL_CHANNELS, p_obj);
            return this;
        }

        public getChannels(cb: kmf.KCallback<Channel[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInputPort.REL_CHANNELS,  (kObjects : kmf.KObject[]) => {
                var casted: Channel[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Channel>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfChannels(): number {
            return this.size(meta.MetaInputPort.REL_CHANNELS);
        }

        public addType(p_obj: PortType): InputPort {
            this.add(meta.MetaInputPort.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: PortType): InputPort {
            this.remove(meta.MetaInputPort.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<PortType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInputPort.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: PortType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PortType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaInputPort.REL_TYPE);
        }

    }

    export class InstanceImpl extends kmf.abs.AbstractKObject implements Instance {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaInstance.ATT_NAME);
        }

        public setName(p_obj: string): Instance {
            this.set(meta.MetaInstance.ATT_NAME, p_obj);
            return this;
        }

        public getStarted(): boolean {
            return <boolean>this.get(meta.MetaInstance.ATT_STARTED);
        }

        public setStarted(p_obj: boolean): Instance {
            this.set(meta.MetaInstance.ATT_STARTED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Instance {
            this.add(meta.MetaInstance.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Instance {
            this.remove(meta.MetaInstance.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInstance.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaInstance.REL_METADATA);
        }

        public addDictionary(p_obj: Dictionary): Instance {
            this.add(meta.MetaInstance.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: Dictionary): Instance {
            this.remove(meta.MetaInstance.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<Dictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInstance.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: Dictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Dictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaInstance.REL_DICTIONARY);
        }

        public addTypeDefinition(p_obj: TypeDefinition): Instance {
            this.add(meta.MetaInstance.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public removeTypeDefinition(p_obj: TypeDefinition): Instance {
            this.remove(meta.MetaInstance.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaInstance.REL_TYPEDEFINITION,  (kObjects : kmf.KObject[]) => {
                var casted: TypeDefinition[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <TypeDefinition>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfTypeDefinition(): number {
            return this.size(meta.MetaInstance.REL_TYPEDEFINITION);
        }

    }

    export class ItemImpl extends kmf.abs.AbstractKObject implements Item {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getValue(): string {
            return <string>this.get(meta.MetaItem.ATT_VALUE);
        }

        public setValue(p_obj: string): Item {
            this.set(meta.MetaItem.ATT_VALUE, p_obj);
            return this;
        }

    }

    export class ListParamImpl extends kmf.abs.AbstractKObject implements ListParam {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaListParam.ATT_NAME);
        }

        public setName(p_obj: string): ListParam {
            this.set(meta.MetaListParam.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): ListParam {
            this.add(meta.MetaListParam.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): ListParam {
            this.remove(meta.MetaListParam.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaListParam.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaListParam.REL_METADATA);
        }

        public addValues(p_obj: Item): ListParam {
            this.add(meta.MetaListParam.REL_VALUES, p_obj);
            return this;
        }

        public removeValues(p_obj: Item): ListParam {
            this.remove(meta.MetaListParam.REL_VALUES, p_obj);
            return this;
        }

        public getValues(cb: kmf.KCallback<Item[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaListParam.REL_VALUES,  (kObjects : kmf.KObject[]) => {
                var casted: Item[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Item>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfValues(): number {
            return this.size(meta.MetaListParam.REL_VALUES);
        }

        public addType(p_obj: ParamType): ListParam {
            this.add(meta.MetaListParam.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: ParamType): ListParam {
            this.remove(meta.MetaListParam.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<ParamType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaListParam.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: ParamType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <ParamType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaListParam.REL_TYPE);
        }

    }

    export class ListParamTypeImpl extends kmf.abs.AbstractKObject implements ListParamType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getFragment(): boolean {
            return <boolean>this.get(meta.MetaListParamType.ATT_FRAGMENT);
        }

        public setFragment(p_obj: boolean): ListParamType {
            this.set(meta.MetaListParamType.ATT_FRAGMENT, p_obj);
            return this;
        }

        public getName(): string {
            return <string>this.get(meta.MetaListParamType.ATT_NAME);
        }

        public setName(p_obj: string): ListParamType {
            this.set(meta.MetaListParamType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaListParamType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): ListParamType {
            this.set(meta.MetaListParamType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRequired(): boolean {
            return <boolean>this.get(meta.MetaListParamType.ATT_REQUIRED);
        }

        public setRequired(p_obj: boolean): ListParamType {
            this.set(meta.MetaListParamType.ATT_REQUIRED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): ListParamType {
            this.add(meta.MetaListParamType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): ListParamType {
            this.remove(meta.MetaListParamType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaListParamType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaListParamType.REL_METADATA);
        }

        public addDefault(p_obj: Item): ListParamType {
            this.add(meta.MetaListParamType.REL_DEFAULT, p_obj);
            return this;
        }

        public removeDefault(p_obj: Item): ListParamType {
            this.remove(meta.MetaListParamType.REL_DEFAULT, p_obj);
            return this;
        }

        public getDefault(cb: kmf.KCallback<Item[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaListParamType.REL_DEFAULT,  (kObjects : kmf.KObject[]) => {
                var casted: Item[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Item>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDefault(): number {
            return this.size(meta.MetaListParamType.REL_DEFAULT);
        }

        public addConstraints(p_obj: AbstractConstraint): ListParamType {
            this.add(meta.MetaListParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public removeConstraints(p_obj: AbstractConstraint): ListParamType {
            this.remove(meta.MetaListParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaListParamType.REL_CONSTRAINTS,  (kObjects : kmf.KObject[]) => {
                var casted: AbstractConstraint[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <AbstractConstraint>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfConstraints(): number {
            return this.size(meta.MetaListParamType.REL_CONSTRAINTS);
        }

    }

    export class MaxConstraintImpl extends kmf.abs.AbstractKObject implements MaxConstraint {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getExclusive(): boolean {
            return <boolean>this.get(meta.MetaMaxConstraint.ATT_EXCLUSIVE);
        }

        public setExclusive(p_obj: boolean): MaxConstraint {
            this.set(meta.MetaMaxConstraint.ATT_EXCLUSIVE, p_obj);
            return this;
        }

        public getValue(): number {
            return <number>this.get(meta.MetaMaxConstraint.ATT_VALUE);
        }

        public setValue(p_obj: number): MaxConstraint {
            this.set(meta.MetaMaxConstraint.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): MaxConstraint {
            this.add(meta.MetaMaxConstraint.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): MaxConstraint {
            this.remove(meta.MetaMaxConstraint.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaMaxConstraint.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaMaxConstraint.REL_METADATA);
        }

    }

    export class MinConstraintImpl extends kmf.abs.AbstractKObject implements MinConstraint {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getExclusive(): boolean {
            return <boolean>this.get(meta.MetaMinConstraint.ATT_EXCLUSIVE);
        }

        public setExclusive(p_obj: boolean): MinConstraint {
            this.set(meta.MetaMinConstraint.ATT_EXCLUSIVE, p_obj);
            return this;
        }

        public getValue(): number {
            return <number>this.get(meta.MetaMinConstraint.ATT_VALUE);
        }

        public setValue(p_obj: number): MinConstraint {
            this.set(meta.MetaMinConstraint.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): MinConstraint {
            this.add(meta.MetaMinConstraint.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): MinConstraint {
            this.remove(meta.MetaMinConstraint.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaMinConstraint.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaMinConstraint.REL_METADATA);
        }

    }

    export class ModelImpl extends kmf.abs.AbstractKObject implements Model {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public addMetaData(p_obj: Value): Model {
            this.add(meta.MetaModel.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Model {
            this.remove(meta.MetaModel.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaModel.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaModel.REL_METADATA);
        }

        public addNodes(p_obj: Node): Model {
            this.add(meta.MetaModel.REL_NODES, p_obj);
            return this;
        }

        public removeNodes(p_obj: Node): Model {
            this.remove(meta.MetaModel.REL_NODES, p_obj);
            return this;
        }

        public getNodes(cb: kmf.KCallback<Node[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaModel.REL_NODES,  (kObjects : kmf.KObject[]) => {
                var casted: Node[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Node>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfNodes(): number {
            return this.size(meta.MetaModel.REL_NODES);
        }

        public addChannels(p_obj: Channel): Model {
            this.add(meta.MetaModel.REL_CHANNELS, p_obj);
            return this;
        }

        public removeChannels(p_obj: Channel): Model {
            this.remove(meta.MetaModel.REL_CHANNELS, p_obj);
            return this;
        }

        public getChannels(cb: kmf.KCallback<Channel[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaModel.REL_CHANNELS,  (kObjects : kmf.KObject[]) => {
                var casted: Channel[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Channel>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfChannels(): number {
            return this.size(meta.MetaModel.REL_CHANNELS);
        }

        public addGroups(p_obj: Group): Model {
            this.add(meta.MetaModel.REL_GROUPS, p_obj);
            return this;
        }

        public removeGroups(p_obj: Group): Model {
            this.remove(meta.MetaModel.REL_GROUPS, p_obj);
            return this;
        }

        public getGroups(cb: kmf.KCallback<Group[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaModel.REL_GROUPS,  (kObjects : kmf.KObject[]) => {
                var casted: Group[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Group>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfGroups(): number {
            return this.size(meta.MetaModel.REL_GROUPS);
        }

        public addNamespaces(p_obj: Namespace): Model {
            this.add(meta.MetaModel.REL_NAMESPACES, p_obj);
            return this;
        }

        public removeNamespaces(p_obj: Namespace): Model {
            this.remove(meta.MetaModel.REL_NAMESPACES, p_obj);
            return this;
        }

        public getNamespaces(cb: kmf.KCallback<Namespace[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaModel.REL_NAMESPACES,  (kObjects : kmf.KObject[]) => {
                var casted: Namespace[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Namespace>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfNamespaces(): number {
            return this.size(meta.MetaModel.REL_NAMESPACES);
        }

    }

    export class MultilineConstraintImpl extends kmf.abs.AbstractKObject implements MultilineConstraint {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getValue(): boolean {
            return <boolean>this.get(meta.MetaMultilineConstraint.ATT_VALUE);
        }

        public setValue(p_obj: boolean): MultilineConstraint {
            this.set(meta.MetaMultilineConstraint.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): MultilineConstraint {
            this.add(meta.MetaMultilineConstraint.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): MultilineConstraint {
            this.remove(meta.MetaMultilineConstraint.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaMultilineConstraint.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaMultilineConstraint.REL_METADATA);
        }

    }

    export class NamespaceImpl extends kmf.abs.AbstractKObject implements Namespace {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaNamespace.ATT_NAME);
        }

        public setName(p_obj: string): Namespace {
            this.set(meta.MetaNamespace.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Namespace {
            this.add(meta.MetaNamespace.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Namespace {
            this.remove(meta.MetaNamespace.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNamespace.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaNamespace.REL_METADATA);
        }

        public addTypeDefinitions(p_obj: TypeDefinition): Namespace {
            this.add(meta.MetaNamespace.REL_TYPEDEFINITIONS, p_obj);
            return this;
        }

        public removeTypeDefinitions(p_obj: TypeDefinition): Namespace {
            this.remove(meta.MetaNamespace.REL_TYPEDEFINITIONS, p_obj);
            return this;
        }

        public getTypeDefinitions(cb: kmf.KCallback<TypeDefinition[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNamespace.REL_TYPEDEFINITIONS,  (kObjects : kmf.KObject[]) => {
                var casted: TypeDefinition[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <TypeDefinition>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfTypeDefinitions(): number {
            return this.size(meta.MetaNamespace.REL_TYPEDEFINITIONS);
        }

    }

    export class NodeImpl extends kmf.abs.AbstractKObject implements Node {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaNode.ATT_NAME);
        }

        public setName(p_obj: string): Node {
            this.set(meta.MetaNode.ATT_NAME, p_obj);
            return this;
        }

        public getStarted(): boolean {
            return <boolean>this.get(meta.MetaNode.ATT_STARTED);
        }

        public setStarted(p_obj: boolean): Node {
            this.set(meta.MetaNode.ATT_STARTED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Node {
            this.add(meta.MetaNode.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Node {
            this.remove(meta.MetaNode.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaNode.REL_METADATA);
        }

        public addComponents(p_obj: Component): Node {
            this.add(meta.MetaNode.REL_COMPONENTS, p_obj);
            return this;
        }

        public removeComponents(p_obj: Component): Node {
            this.remove(meta.MetaNode.REL_COMPONENTS, p_obj);
            return this;
        }

        public getComponents(cb: kmf.KCallback<Component[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_COMPONENTS,  (kObjects : kmf.KObject[]) => {
                var casted: Component[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Component>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfComponents(): number {
            return this.size(meta.MetaNode.REL_COMPONENTS);
        }

        public addDictionary(p_obj: Dictionary): Node {
            this.add(meta.MetaNode.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: Dictionary): Node {
            this.remove(meta.MetaNode.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<Dictionary[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: Dictionary[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Dictionary>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaNode.REL_DICTIONARY);
        }

        public addTypeDefinition(p_obj: TypeDefinition): Node {
            this.add(meta.MetaNode.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public removeTypeDefinition(p_obj: TypeDefinition): Node {
            this.remove(meta.MetaNode.REL_TYPEDEFINITION, p_obj);
            return this;
        }

        public getTypeDefinition(cb: kmf.KCallback<TypeDefinition[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_TYPEDEFINITION,  (kObjects : kmf.KObject[]) => {
                var casted: TypeDefinition[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <TypeDefinition>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfTypeDefinition(): number {
            return this.size(meta.MetaNode.REL_TYPEDEFINITION);
        }

        public addHost(p_obj: Node): Node {
            this.add(meta.MetaNode.REL_HOST, p_obj);
            return this;
        }

        public removeHost(p_obj: Node): Node {
            this.remove(meta.MetaNode.REL_HOST, p_obj);
            return this;
        }

        public getHost(cb: kmf.KCallback<Node[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_HOST,  (kObjects : kmf.KObject[]) => {
                var casted: Node[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Node>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfHost(): number {
            return this.size(meta.MetaNode.REL_HOST);
        }

        public addGroups(p_obj: Group): Node {
            this.add(meta.MetaNode.REL_GROUPS, p_obj);
            return this;
        }

        public removeGroups(p_obj: Group): Node {
            this.remove(meta.MetaNode.REL_GROUPS, p_obj);
            return this;
        }

        public getGroups(cb: kmf.KCallback<Group[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_GROUPS,  (kObjects : kmf.KObject[]) => {
                var casted: Group[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Group>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfGroups(): number {
            return this.size(meta.MetaNode.REL_GROUPS);
        }

        public addSubNodes(p_obj: Node): Node {
            this.add(meta.MetaNode.REL_SUBNODES, p_obj);
            return this;
        }

        public removeSubNodes(p_obj: Node): Node {
            this.remove(meta.MetaNode.REL_SUBNODES, p_obj);
            return this;
        }

        public getSubNodes(cb: kmf.KCallback<Node[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNode.REL_SUBNODES,  (kObjects : kmf.KObject[]) => {
                var casted: Node[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Node>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfSubNodes(): number {
            return this.size(meta.MetaNode.REL_SUBNODES);
        }

    }

    export class NodeTypeImpl extends kmf.abs.AbstractKObject implements NodeType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaNodeType.ATT_NAME);
        }

        public setName(p_obj: string): NodeType {
            this.set(meta.MetaNodeType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaNodeType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): NodeType {
            this.set(meta.MetaNodeType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getVersion(): number {
            return <number>this.get(meta.MetaNodeType.ATT_VERSION);
        }

        public setVersion(p_obj: number): NodeType {
            this.set(meta.MetaNodeType.ATT_VERSION, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): NodeType {
            this.add(meta.MetaNodeType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): NodeType {
            this.remove(meta.MetaNodeType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNodeType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaNodeType.REL_METADATA);
        }

        public addDictionary(p_obj: DictionaryType): NodeType {
            this.add(meta.MetaNodeType.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: DictionaryType): NodeType {
            this.remove(meta.MetaNodeType.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<DictionaryType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNodeType.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: DictionaryType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DictionaryType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaNodeType.REL_DICTIONARY);
        }

        public addDeployUnits(p_obj: DeployUnit): NodeType {
            this.add(meta.MetaNodeType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public removeDeployUnits(p_obj: DeployUnit): NodeType {
            this.remove(meta.MetaNodeType.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNodeType.REL_DEPLOYUNITS,  (kObjects : kmf.KObject[]) => {
                var casted: DeployUnit[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DeployUnit>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDeployUnits(): number {
            return this.size(meta.MetaNodeType.REL_DEPLOYUNITS);
        }

        public addPreferedVersions(p_obj: PreferedVersion): NodeType {
            this.add(meta.MetaNodeType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public removePreferedVersions(p_obj: PreferedVersion): NodeType {
            this.remove(meta.MetaNodeType.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNodeType.REL_PREFEREDVERSIONS,  (kObjects : kmf.KObject[]) => {
                var casted: PreferedVersion[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PreferedVersion>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfPreferedVersions(): number {
            return this.size(meta.MetaNodeType.REL_PREFEREDVERSIONS);
        }

    }

    export class NumberParamImpl extends kmf.abs.AbstractKObject implements NumberParam {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaNumberParam.ATT_NAME);
        }

        public setName(p_obj: string): NumberParam {
            this.set(meta.MetaNumberParam.ATT_NAME, p_obj);
            return this;
        }

        public getValue(): string {
            return <string>this.get(meta.MetaNumberParam.ATT_VALUE);
        }

        public setValue(p_obj: string): NumberParam {
            this.set(meta.MetaNumberParam.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): NumberParam {
            this.add(meta.MetaNumberParam.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): NumberParam {
            this.remove(meta.MetaNumberParam.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNumberParam.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaNumberParam.REL_METADATA);
        }

        public addType(p_obj: ParamType): NumberParam {
            this.add(meta.MetaNumberParam.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: ParamType): NumberParam {
            this.remove(meta.MetaNumberParam.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<ParamType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNumberParam.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: ParamType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <ParamType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaNumberParam.REL_TYPE);
        }

    }

    export class NumberParamTypeImpl extends kmf.abs.AbstractKObject implements NumberParamType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getDefault(): string {
            return <string>this.get(meta.MetaNumberParamType.ATT_DEFAULT);
        }

        public setDefault(p_obj: string): NumberParamType {
            this.set(meta.MetaNumberParamType.ATT_DEFAULT, p_obj);
            return this;
        }

        public getFragment(): boolean {
            return <boolean>this.get(meta.MetaNumberParamType.ATT_FRAGMENT);
        }

        public setFragment(p_obj: boolean): NumberParamType {
            this.set(meta.MetaNumberParamType.ATT_FRAGMENT, p_obj);
            return this;
        }

        public getName(): string {
            return <string>this.get(meta.MetaNumberParamType.ATT_NAME);
        }

        public setName(p_obj: string): NumberParamType {
            this.set(meta.MetaNumberParamType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaNumberParamType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): NumberParamType {
            this.set(meta.MetaNumberParamType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getType(): NumberType {
            return <NumberType>this.get(meta.MetaNumberParamType.ATT_TYPE);
        }

        public setType(p_obj: NumberType): NumberParamType {
            this.set(meta.MetaNumberParamType.ATT_TYPE, p_obj);
            return this;
        }

        public getRequired(): boolean {
            return <boolean>this.get(meta.MetaNumberParamType.ATT_REQUIRED);
        }

        public setRequired(p_obj: boolean): NumberParamType {
            this.set(meta.MetaNumberParamType.ATT_REQUIRED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): NumberParamType {
            this.add(meta.MetaNumberParamType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): NumberParamType {
            this.remove(meta.MetaNumberParamType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNumberParamType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaNumberParamType.REL_METADATA);
        }

        public addConstraints(p_obj: AbstractConstraint): NumberParamType {
            this.add(meta.MetaNumberParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public removeConstraints(p_obj: AbstractConstraint): NumberParamType {
            this.remove(meta.MetaNumberParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaNumberParamType.REL_CONSTRAINTS,  (kObjects : kmf.KObject[]) => {
                var casted: AbstractConstraint[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <AbstractConstraint>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfConstraints(): number {
            return this.size(meta.MetaNumberParamType.REL_CONSTRAINTS);
        }

    }

    export class NumberTypeLiteral extends kmf.meta.impl.MetaLiteral implements NumberType {

        constructor(p_name: string, p_index: number, p_className: string) {
            super(p_name, p_index, p_className);
        }

    }

    export class OutputPortImpl extends kmf.abs.AbstractKObject implements OutputPort {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaOutputPort.ATT_NAME);
        }

        public setName(p_obj: string): OutputPort {
            this.set(meta.MetaOutputPort.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): OutputPort {
            this.add(meta.MetaOutputPort.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): OutputPort {
            this.remove(meta.MetaOutputPort.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaOutputPort.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaOutputPort.REL_METADATA);
        }

        public addComponents(p_obj: Component): OutputPort {
            this.add(meta.MetaOutputPort.REL_COMPONENTS, p_obj);
            return this;
        }

        public removeComponents(p_obj: Component): OutputPort {
            this.remove(meta.MetaOutputPort.REL_COMPONENTS, p_obj);
            return this;
        }

        public getComponents(cb: kmf.KCallback<Component[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaOutputPort.REL_COMPONENTS,  (kObjects : kmf.KObject[]) => {
                var casted: Component[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Component>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfComponents(): number {
            return this.size(meta.MetaOutputPort.REL_COMPONENTS);
        }

        public addChannels(p_obj: Channel): OutputPort {
            this.add(meta.MetaOutputPort.REL_CHANNELS, p_obj);
            return this;
        }

        public removeChannels(p_obj: Channel): OutputPort {
            this.remove(meta.MetaOutputPort.REL_CHANNELS, p_obj);
            return this;
        }

        public getChannels(cb: kmf.KCallback<Channel[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaOutputPort.REL_CHANNELS,  (kObjects : kmf.KObject[]) => {
                var casted: Channel[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Channel>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfChannels(): number {
            return this.size(meta.MetaOutputPort.REL_CHANNELS);
        }

        public addType(p_obj: PortType): OutputPort {
            this.add(meta.MetaOutputPort.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: PortType): OutputPort {
            this.remove(meta.MetaOutputPort.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<PortType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaOutputPort.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: PortType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PortType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaOutputPort.REL_TYPE);
        }

    }

    export class ParamImpl extends kmf.abs.AbstractKObject implements Param {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaParam.ATT_NAME);
        }

        public setName(p_obj: string): Param {
            this.set(meta.MetaParam.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Param {
            this.add(meta.MetaParam.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Param {
            this.remove(meta.MetaParam.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaParam.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaParam.REL_METADATA);
        }

        public addType(p_obj: ParamType): Param {
            this.add(meta.MetaParam.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: ParamType): Param {
            this.remove(meta.MetaParam.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<ParamType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaParam.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: ParamType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <ParamType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaParam.REL_TYPE);
        }

    }

    export class ParamTypeImpl extends kmf.abs.AbstractKObject implements ParamType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getFragment(): boolean {
            return <boolean>this.get(meta.MetaParamType.ATT_FRAGMENT);
        }

        public setFragment(p_obj: boolean): ParamType {
            this.set(meta.MetaParamType.ATT_FRAGMENT, p_obj);
            return this;
        }

        public getName(): string {
            return <string>this.get(meta.MetaParamType.ATT_NAME);
        }

        public setName(p_obj: string): ParamType {
            this.set(meta.MetaParamType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaParamType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): ParamType {
            this.set(meta.MetaParamType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRequired(): boolean {
            return <boolean>this.get(meta.MetaParamType.ATT_REQUIRED);
        }

        public setRequired(p_obj: boolean): ParamType {
            this.set(meta.MetaParamType.ATT_REQUIRED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): ParamType {
            this.add(meta.MetaParamType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): ParamType {
            this.remove(meta.MetaParamType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaParamType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaParamType.REL_METADATA);
        }

        public addConstraints(p_obj: AbstractConstraint): ParamType {
            this.add(meta.MetaParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public removeConstraints(p_obj: AbstractConstraint): ParamType {
            this.remove(meta.MetaParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaParamType.REL_CONSTRAINTS,  (kObjects : kmf.KObject[]) => {
                var casted: AbstractConstraint[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <AbstractConstraint>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfConstraints(): number {
            return this.size(meta.MetaParamType.REL_CONSTRAINTS);
        }

    }

    export class PortImpl extends kmf.abs.AbstractKObject implements Port {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaPort.ATT_NAME);
        }

        public setName(p_obj: string): Port {
            this.set(meta.MetaPort.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Port {
            this.add(meta.MetaPort.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Port {
            this.remove(meta.MetaPort.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPort.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaPort.REL_METADATA);
        }

        public addComponents(p_obj: Component): Port {
            this.add(meta.MetaPort.REL_COMPONENTS, p_obj);
            return this;
        }

        public removeComponents(p_obj: Component): Port {
            this.remove(meta.MetaPort.REL_COMPONENTS, p_obj);
            return this;
        }

        public getComponents(cb: kmf.KCallback<Component[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPort.REL_COMPONENTS,  (kObjects : kmf.KObject[]) => {
                var casted: Component[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Component>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfComponents(): number {
            return this.size(meta.MetaPort.REL_COMPONENTS);
        }

        public addChannels(p_obj: Channel): Port {
            this.add(meta.MetaPort.REL_CHANNELS, p_obj);
            return this;
        }

        public removeChannels(p_obj: Channel): Port {
            this.remove(meta.MetaPort.REL_CHANNELS, p_obj);
            return this;
        }

        public getChannels(cb: kmf.KCallback<Channel[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPort.REL_CHANNELS,  (kObjects : kmf.KObject[]) => {
                var casted: Channel[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Channel>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfChannels(): number {
            return this.size(meta.MetaPort.REL_CHANNELS);
        }

        public addType(p_obj: PortType): Port {
            this.add(meta.MetaPort.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: PortType): Port {
            this.remove(meta.MetaPort.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<PortType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPort.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: PortType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PortType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaPort.REL_TYPE);
        }

    }

    export class PortTypeImpl extends kmf.abs.AbstractKObject implements PortType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaPortType.ATT_NAME);
        }

        public setName(p_obj: string): PortType {
            this.set(meta.MetaPortType.ATT_NAME, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): PortType {
            this.add(meta.MetaPortType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): PortType {
            this.remove(meta.MetaPortType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPortType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaPortType.REL_METADATA);
        }

        public addProtocol(p_obj: Value): PortType {
            this.add(meta.MetaPortType.REL_PROTOCOL, p_obj);
            return this;
        }

        public removeProtocol(p_obj: Value): PortType {
            this.remove(meta.MetaPortType.REL_PROTOCOL, p_obj);
            return this;
        }

        public getProtocol(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPortType.REL_PROTOCOL,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfProtocol(): number {
            return this.size(meta.MetaPortType.REL_PROTOCOL);
        }

    }

    export class PreferedVersionImpl extends kmf.abs.AbstractKObject implements PreferedVersion {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaPreferedVersion.ATT_NAME);
        }

        public setName(p_obj: string): PreferedVersion {
            this.set(meta.MetaPreferedVersion.ATT_NAME, p_obj);
            return this;
        }

        public getVersion(): string {
            return <string>this.get(meta.MetaPreferedVersion.ATT_VERSION);
        }

        public setVersion(p_obj: string): PreferedVersion {
            this.set(meta.MetaPreferedVersion.ATT_VERSION, p_obj);
            return this;
        }

        public getPlatform(): string {
            return <string>this.get(meta.MetaPreferedVersion.ATT_PLATFORM);
        }

        public setPlatform(p_obj: string): PreferedVersion {
            this.set(meta.MetaPreferedVersion.ATT_PLATFORM, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): PreferedVersion {
            this.add(meta.MetaPreferedVersion.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): PreferedVersion {
            this.remove(meta.MetaPreferedVersion.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaPreferedVersion.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaPreferedVersion.REL_METADATA);
        }

    }

    export class StringParamImpl extends kmf.abs.AbstractKObject implements StringParam {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaStringParam.ATT_NAME);
        }

        public setName(p_obj: string): StringParam {
            this.set(meta.MetaStringParam.ATT_NAME, p_obj);
            return this;
        }

        public getValue(): string {
            return <string>this.get(meta.MetaStringParam.ATT_VALUE);
        }

        public setValue(p_obj: string): StringParam {
            this.set(meta.MetaStringParam.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): StringParam {
            this.add(meta.MetaStringParam.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): StringParam {
            this.remove(meta.MetaStringParam.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaStringParam.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaStringParam.REL_METADATA);
        }

        public addType(p_obj: ParamType): StringParam {
            this.add(meta.MetaStringParam.REL_TYPE, p_obj);
            return this;
        }

        public removeType(p_obj: ParamType): StringParam {
            this.remove(meta.MetaStringParam.REL_TYPE, p_obj);
            return this;
        }

        public getType(cb: kmf.KCallback<ParamType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaStringParam.REL_TYPE,  (kObjects : kmf.KObject[]) => {
                var casted: ParamType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <ParamType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfType(): number {
            return this.size(meta.MetaStringParam.REL_TYPE);
        }

    }

    export class StringParamTypeImpl extends kmf.abs.AbstractKObject implements StringParamType {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getDefault(): string {
            return <string>this.get(meta.MetaStringParamType.ATT_DEFAULT);
        }

        public setDefault(p_obj: string): StringParamType {
            this.set(meta.MetaStringParamType.ATT_DEFAULT, p_obj);
            return this;
        }

        public getFragment(): boolean {
            return <boolean>this.get(meta.MetaStringParamType.ATT_FRAGMENT);
        }

        public setFragment(p_obj: boolean): StringParamType {
            this.set(meta.MetaStringParamType.ATT_FRAGMENT, p_obj);
            return this;
        }

        public getName(): string {
            return <string>this.get(meta.MetaStringParamType.ATT_NAME);
        }

        public setName(p_obj: string): StringParamType {
            this.set(meta.MetaStringParamType.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaStringParamType.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): StringParamType {
            this.set(meta.MetaStringParamType.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getRequired(): boolean {
            return <boolean>this.get(meta.MetaStringParamType.ATT_REQUIRED);
        }

        public setRequired(p_obj: boolean): StringParamType {
            this.set(meta.MetaStringParamType.ATT_REQUIRED, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): StringParamType {
            this.add(meta.MetaStringParamType.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): StringParamType {
            this.remove(meta.MetaStringParamType.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaStringParamType.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaStringParamType.REL_METADATA);
        }

        public addConstraints(p_obj: AbstractConstraint): StringParamType {
            this.add(meta.MetaStringParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public removeConstraints(p_obj: AbstractConstraint): StringParamType {
            this.remove(meta.MetaStringParamType.REL_CONSTRAINTS, p_obj);
            return this;
        }

        public getConstraints(cb: kmf.KCallback<AbstractConstraint[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaStringParamType.REL_CONSTRAINTS,  (kObjects : kmf.KObject[]) => {
                var casted: AbstractConstraint[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <AbstractConstraint>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfConstraints(): number {
            return this.size(meta.MetaStringParamType.REL_CONSTRAINTS);
        }

    }

    export class TypeDefinitionImpl extends kmf.abs.AbstractKObject implements TypeDefinition {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaTypeDefinition.ATT_NAME);
        }

        public setName(p_obj: string): TypeDefinition {
            this.set(meta.MetaTypeDefinition.ATT_NAME, p_obj);
            return this;
        }

        public getDescription(): string {
            return <string>this.get(meta.MetaTypeDefinition.ATT_DESCRIPTION);
        }

        public setDescription(p_obj: string): TypeDefinition {
            this.set(meta.MetaTypeDefinition.ATT_DESCRIPTION, p_obj);
            return this;
        }

        public getVersion(): number {
            return <number>this.get(meta.MetaTypeDefinition.ATT_VERSION);
        }

        public setVersion(p_obj: number): TypeDefinition {
            this.set(meta.MetaTypeDefinition.ATT_VERSION, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): TypeDefinition {
            this.add(meta.MetaTypeDefinition.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): TypeDefinition {
            this.remove(meta.MetaTypeDefinition.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaTypeDefinition.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaTypeDefinition.REL_METADATA);
        }

        public addDictionary(p_obj: DictionaryType): TypeDefinition {
            this.add(meta.MetaTypeDefinition.REL_DICTIONARY, p_obj);
            return this;
        }

        public removeDictionary(p_obj: DictionaryType): TypeDefinition {
            this.remove(meta.MetaTypeDefinition.REL_DICTIONARY, p_obj);
            return this;
        }

        public getDictionary(cb: kmf.KCallback<DictionaryType[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaTypeDefinition.REL_DICTIONARY,  (kObjects : kmf.KObject[]) => {
                var casted: DictionaryType[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DictionaryType>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDictionary(): number {
            return this.size(meta.MetaTypeDefinition.REL_DICTIONARY);
        }

        public addDeployUnits(p_obj: DeployUnit): TypeDefinition {
            this.add(meta.MetaTypeDefinition.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public removeDeployUnits(p_obj: DeployUnit): TypeDefinition {
            this.remove(meta.MetaTypeDefinition.REL_DEPLOYUNITS, p_obj);
            return this;
        }

        public getDeployUnits(cb: kmf.KCallback<DeployUnit[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaTypeDefinition.REL_DEPLOYUNITS,  (kObjects : kmf.KObject[]) => {
                var casted: DeployUnit[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <DeployUnit>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfDeployUnits(): number {
            return this.size(meta.MetaTypeDefinition.REL_DEPLOYUNITS);
        }

        public addPreferedVersions(p_obj: PreferedVersion): TypeDefinition {
            this.add(meta.MetaTypeDefinition.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public removePreferedVersions(p_obj: PreferedVersion): TypeDefinition {
            this.remove(meta.MetaTypeDefinition.REL_PREFEREDVERSIONS, p_obj);
            return this;
        }

        public getPreferedVersions(cb: kmf.KCallback<PreferedVersion[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaTypeDefinition.REL_PREFEREDVERSIONS,  (kObjects : kmf.KObject[]) => {
                var casted: PreferedVersion[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <PreferedVersion>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfPreferedVersions(): number {
            return this.size(meta.MetaTypeDefinition.REL_PREFEREDVERSIONS);
        }

    }

    export class ValueImpl extends kmf.abs.AbstractKObject implements Value {

        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.meta.KMetaClass, p_manager: kmf.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
            super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }

        public getName(): string {
            return <string>this.get(meta.MetaValue.ATT_NAME);
        }

        public setName(p_obj: string): Value {
            this.set(meta.MetaValue.ATT_NAME, p_obj);
            return this;
        }

        public getValue(): string {
            return <string>this.get(meta.MetaValue.ATT_VALUE);
        }

        public setValue(p_obj: string): Value {
            this.set(meta.MetaValue.ATT_VALUE, p_obj);
            return this;
        }

        public addMetaData(p_obj: Value): Value {
            this.add(meta.MetaValue.REL_METADATA, p_obj);
            return this;
        }

        public removeMetaData(p_obj: Value): Value {
            this.remove(meta.MetaValue.REL_METADATA, p_obj);
            return this;
        }

        public getMetaData(cb: kmf.KCallback<Value[]>): void {
            if (cb == null) {
                return;
            }
            this.getRelation(meta.MetaValue.REL_METADATA,  (kObjects : kmf.KObject[]) => {
                var casted: Value[] = new Array();
                for (var i: number = 0; i < kObjects.length; i++) {
                    casted[i] = <Value>kObjects[i];
                }
                cb(casted);
            });
        }

        public sizeOfMetaData(): number {
            return this.size(meta.MetaValue.REL_METADATA);
        }

    }

}
export namespace meta {
    export class MetaAbstractConstraint extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaAbstractConstraint = null;
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 0, true, 6, "op_AbstractConstraint_metaData", 24, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParamType_constraints", 1, false, 35, "constraints", 24, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_StringParamType_constraints", 2, false, 31, "constraints", 24, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ParamType_constraints", 3, false, 23, "constraints", 24, -1);
        public static getInstance(): meta.MetaAbstractConstraint {
            if (MetaAbstractConstraint.INSTANCE == null) {
                MetaAbstractConstraint.INSTANCE = new meta.MetaAbstractConstraint();
            }
            return MetaAbstractConstraint.INSTANCE;
        }

        constructor() {
            super("AbstractConstraint", 24, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaAbstractConstraint.REL_METADATA;
            temp_all[1] = MetaAbstractConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
            temp_all[2] = MetaAbstractConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
            temp_all[3] = MetaAbstractConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaBooleanParam extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaBooleanParam = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_Param_metaData", 28, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Dictionary_params", 3, false, 9, "params", 28, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_FragmentDictionary_params", 4, false, 13, "params", 28, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 5, true, 23, "op_Param_type", 28, -1);
        public static getInstance(): meta.MetaBooleanParam {
            if (MetaBooleanParam.INSTANCE == null) {
                MetaBooleanParam.INSTANCE = new meta.MetaBooleanParam();
            }
            return MetaBooleanParam.INSTANCE;
        }

        constructor() {
            super("BooleanParam", 28, null, new Int32Array([25]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaBooleanParam.ATT_NAME;
            temp_all[1] = MetaBooleanParam.ATT_VALUE;
            temp_all[2] = MetaBooleanParam.REL_METADATA;
            temp_all[3] = MetaBooleanParam.REL_OP_DICTIONARY_PARAMS;
            temp_all[4] = MetaBooleanParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
            temp_all[5] = MetaBooleanParam.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaBooleanParamType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaBooleanParamType = null;
        public static ATT_DEFAULT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("default", 0, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("required", 4, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 5, true, 6, "op_ParamType_metaData", 33, -1);
        public static REL_OP_PARAM_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_type", 6, false, 25, "type", 33, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 16, "params", 33, -1);
        public static REL_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("constraints", 8, true, 24, "op_ParamType_constraints", 33, -1);
        public static getInstance(): meta.MetaBooleanParamType {
            if (MetaBooleanParamType.INSTANCE == null) {
                MetaBooleanParamType.INSTANCE = new meta.MetaBooleanParamType();
            }
            return MetaBooleanParamType.INSTANCE;
        }

        constructor() {
            super("BooleanParamType", 33, null, new Int32Array([23]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaBooleanParamType.ATT_DEFAULT;
            temp_all[1] = MetaBooleanParamType.ATT_FRAGMENT;
            temp_all[2] = MetaBooleanParamType.ATT_NAME;
            temp_all[3] = MetaBooleanParamType.ATT_DESCRIPTION;
            temp_all[4] = MetaBooleanParamType.ATT_REQUIRED;
            temp_all[5] = MetaBooleanParamType.REL_METADATA;
            temp_all[6] = MetaBooleanParamType.REL_OP_PARAM_TYPE;
            temp_all[7] = MetaBooleanParamType.REL_OP_DICTIONARYTYPE_PARAMS;
            temp_all[8] = MetaBooleanParamType.REL_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaChannel extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaChannel = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OUTPUTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("outputs", 2, true, 12, "channels", 2, -1);
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 3, true, 6, "op_Channel_metaData", 2, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 4, true, 9, "op_Channel_dictionary", 2, 1);
        public static REL_INPUTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("inputs", 5, true, 11, "channels", 2, -1);
        public static REL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("typeDefinition", 6, true, 8, "op_Channel_typeDefinition", 2, 1);
        public static REL_FRAGMENTDICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("fragmentDictionary", 7, true, 13, "op_Channel_fragmentDictionary", 2, -1);
        public static REL_OP_MODEL_CHANNELS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Model_channels", 8, false, 0, "channels", 2, -1);
        public static getInstance(): meta.MetaChannel {
            if (MetaChannel.INSTANCE == null) {
                MetaChannel.INSTANCE = new meta.MetaChannel();
            }
            return MetaChannel.INSTANCE;
        }

        constructor() {
            super("Channel", 2, null, new Int32Array([7]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaChannel.ATT_NAME;
            temp_all[1] = MetaChannel.ATT_STARTED;
            temp_all[2] = MetaChannel.REL_OUTPUTS;
            temp_all[3] = MetaChannel.REL_METADATA;
            temp_all[4] = MetaChannel.REL_DICTIONARY;
            temp_all[5] = MetaChannel.REL_INPUTS;
            temp_all[6] = MetaChannel.REL_TYPEDEFINITION;
            temp_all[7] = MetaChannel.REL_FRAGMENTDICTIONARY;
            temp_all[8] = MetaChannel.REL_OP_MODEL_CHANNELS;
            this.init(temp_all);
        }

    }

    export class MetaChannelType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaChannelType = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REMOTE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("remote", 2, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENTABLE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragmentable", 3, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 4, 0, false, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 5, true, 6, "op_TypeDefinition_metaData", 21, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 6, true, 16, "op_TypeDefinition_dictionary", 21, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_typeDefinition", 7, false, 1, "typeDefinition", 21, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_typeDefinition", 8, false, 7, "typeDefinition", 21, -1);
        public static REL_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("deployUnits", 9, true, 17, "op_TypeDefinition_deployUnits", 21, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 10, false, 4, "typeDefinitions", 21, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_typeDefinition", 11, false, 10, "typeDefinition", 21, -1);
        public static REL_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("preferedVersions", 12, true, 18, "op_TypeDefinition_preferedVersions", 21, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_typeDefinition", 13, false, 2, "typeDefinition", 21, -1);
        public static getInstance(): meta.MetaChannelType {
            if (MetaChannelType.INSTANCE == null) {
                MetaChannelType.INSTANCE = new meta.MetaChannelType();
            }
            return MetaChannelType.INSTANCE;
        }

        constructor() {
            super("ChannelType", 21, null, new Int32Array([8]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaChannelType.ATT_NAME;
            temp_all[1] = MetaChannelType.ATT_DESCRIPTION;
            temp_all[2] = MetaChannelType.ATT_REMOTE;
            temp_all[3] = MetaChannelType.ATT_FRAGMENTABLE;
            temp_all[4] = MetaChannelType.ATT_VERSION;
            temp_all[5] = MetaChannelType.REL_METADATA;
            temp_all[6] = MetaChannelType.REL_DICTIONARY;
            temp_all[7] = MetaChannelType.REL_OP_NODE_TYPEDEFINITION;
            temp_all[8] = MetaChannelType.REL_OP_INSTANCE_TYPEDEFINITION;
            temp_all[9] = MetaChannelType.REL_DEPLOYUNITS;
            temp_all[10] = MetaChannelType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
            temp_all[11] = MetaChannelType.REL_OP_COMPONENT_TYPEDEFINITION;
            temp_all[12] = MetaChannelType.REL_PREFEREDVERSIONS;
            temp_all[13] = MetaChannelType.REL_OP_CHANNEL_TYPEDEFINITION;
            this.init(temp_all);
        }

    }

    export class MetaChoiceParamType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaChoiceParamType = null;
        public static ATT_DEFAULT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("default", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("required", 4, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 5, true, 6, "op_ParamType_metaData", 34, -1);
        public static REL_OP_PARAM_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_type", 6, false, 25, "type", 34, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 16, "params", 34, -1);
        public static REL_CHOICES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("choices", 8, true, 30, "op_ChoiceParamType_choices", 34, -1);
        public static REL_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("constraints", 9, true, 24, "op_ParamType_constraints", 34, -1);
        public static getInstance(): meta.MetaChoiceParamType {
            if (MetaChoiceParamType.INSTANCE == null) {
                MetaChoiceParamType.INSTANCE = new meta.MetaChoiceParamType();
            }
            return MetaChoiceParamType.INSTANCE;
        }

        constructor() {
            super("ChoiceParamType", 34, null, new Int32Array([23]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaChoiceParamType.ATT_DEFAULT;
            temp_all[1] = MetaChoiceParamType.ATT_FRAGMENT;
            temp_all[2] = MetaChoiceParamType.ATT_NAME;
            temp_all[3] = MetaChoiceParamType.ATT_DESCRIPTION;
            temp_all[4] = MetaChoiceParamType.ATT_REQUIRED;
            temp_all[5] = MetaChoiceParamType.REL_METADATA;
            temp_all[6] = MetaChoiceParamType.REL_OP_PARAM_TYPE;
            temp_all[7] = MetaChoiceParamType.REL_OP_DICTIONARYTYPE_PARAMS;
            temp_all[8] = MetaChoiceParamType.REL_CHOICES;
            temp_all[9] = MetaChoiceParamType.REL_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaComponent extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaComponent = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OUTPUTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("outputs", 2, true, 12, "components", 10, -1);
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 3, true, 6, "op_Component_metaData", 10, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 4, true, 9, "op_Component_dictionary", 10, 1);
        public static REL_INPUTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("inputs", 5, true, 11, "components", 10, -1);
        public static REL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("typeDefinition", 6, true, 8, "op_Component_typeDefinition", 10, 1);
        public static REL_HOST: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("host", 7, true, 1, "components", 10, 1);
        public static getInstance(): meta.MetaComponent {
            if (MetaComponent.INSTANCE == null) {
                MetaComponent.INSTANCE = new meta.MetaComponent();
            }
            return MetaComponent.INSTANCE;
        }

        constructor() {
            super("Component", 10, null, new Int32Array([7]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaComponent.ATT_NAME;
            temp_all[1] = MetaComponent.ATT_STARTED;
            temp_all[2] = MetaComponent.REL_OUTPUTS;
            temp_all[3] = MetaComponent.REL_METADATA;
            temp_all[4] = MetaComponent.REL_DICTIONARY;
            temp_all[5] = MetaComponent.REL_INPUTS;
            temp_all[6] = MetaComponent.REL_TYPEDEFINITION;
            temp_all[7] = MetaComponent.REL_HOST;
            this.init(temp_all);
        }

    }

    export class MetaComponentType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaComponentType = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REMOTE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("remote", 2, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 3, 0, false, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_INPUTTYPES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("inputTypes", 4, true, 15, "op_ComponentType_inputTypes", 22, -1);
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 5, true, 6, "op_TypeDefinition_metaData", 22, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 6, true, 16, "op_TypeDefinition_dictionary", 22, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_typeDefinition", 7, false, 1, "typeDefinition", 22, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_typeDefinition", 8, false, 7, "typeDefinition", 22, -1);
        public static REL_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("deployUnits", 9, true, 17, "op_TypeDefinition_deployUnits", 22, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 10, false, 4, "typeDefinitions", 22, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_typeDefinition", 11, false, 10, "typeDefinition", 22, -1);
        public static REL_OUTPUTTYPES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("outputTypes", 12, true, 15, "op_ComponentType_outputTypes", 22, -1);
        public static REL_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("preferedVersions", 13, true, 18, "op_TypeDefinition_preferedVersions", 22, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_typeDefinition", 14, false, 2, "typeDefinition", 22, -1);
        public static getInstance(): meta.MetaComponentType {
            if (MetaComponentType.INSTANCE == null) {
                MetaComponentType.INSTANCE = new meta.MetaComponentType();
            }
            return MetaComponentType.INSTANCE;
        }

        constructor() {
            super("ComponentType", 22, null, new Int32Array([8]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaComponentType.ATT_NAME;
            temp_all[1] = MetaComponentType.ATT_DESCRIPTION;
            temp_all[2] = MetaComponentType.ATT_REMOTE;
            temp_all[3] = MetaComponentType.ATT_VERSION;
            temp_all[4] = MetaComponentType.REL_INPUTTYPES;
            temp_all[5] = MetaComponentType.REL_METADATA;
            temp_all[6] = MetaComponentType.REL_DICTIONARY;
            temp_all[7] = MetaComponentType.REL_OP_NODE_TYPEDEFINITION;
            temp_all[8] = MetaComponentType.REL_OP_INSTANCE_TYPEDEFINITION;
            temp_all[9] = MetaComponentType.REL_DEPLOYUNITS;
            temp_all[10] = MetaComponentType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
            temp_all[11] = MetaComponentType.REL_OP_COMPONENT_TYPEDEFINITION;
            temp_all[12] = MetaComponentType.REL_OUTPUTTYPES;
            temp_all[13] = MetaComponentType.REL_PREFEREDVERSIONS;
            temp_all[14] = MetaComponentType.REL_OP_CHANNEL_TYPEDEFINITION;
            this.init(temp_all);
        }

    }

    export class MetaDeployUnit extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaDeployUnit = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 1, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_PLATFORM: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("platform", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 3, true, 6, "op_DeployUnit_metaData", 17, -1);
        public static REL_OP_TYPEDEFINITION_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_TypeDefinition_deployUnits", 4, false, 8, "deployUnits", 17, -1);
        public static REL_OP_GROUPTYPE_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_GroupType_deployUnits", 5, false, 20, "deployUnits", 17, -1);
        public static REL_OP_NODETYPE_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_NodeType_deployUnits", 6, false, 19, "deployUnits", 17, -1);
        public static getInstance(): meta.MetaDeployUnit {
            if (MetaDeployUnit.INSTANCE == null) {
                MetaDeployUnit.INSTANCE = new meta.MetaDeployUnit();
            }
            return MetaDeployUnit.INSTANCE;
        }

        constructor() {
            super("DeployUnit", 17, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaDeployUnit.ATT_NAME;
            temp_all[1] = MetaDeployUnit.ATT_VERSION;
            temp_all[2] = MetaDeployUnit.ATT_PLATFORM;
            temp_all[3] = MetaDeployUnit.REL_METADATA;
            temp_all[4] = MetaDeployUnit.REL_OP_TYPEDEFINITION_DEPLOYUNITS;
            temp_all[5] = MetaDeployUnit.REL_OP_GROUPTYPE_DEPLOYUNITS;
            temp_all[6] = MetaDeployUnit.REL_OP_NODETYPE_DEPLOYUNITS;
            this.init(temp_all);
        }

    }

    export class MetaDictionary extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaDictionary = null;
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 0, true, 6, "op_Dictionary_metaData", 9, -1);
        public static REL_OP_COMPONENT_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_dictionary", 1, false, 10, "dictionary", 9, -1);
        public static REL_OP_NODE_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_dictionary", 2, false, 1, "dictionary", 9, -1);
        public static REL_OP_INSTANCE_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_dictionary", 3, false, 7, "dictionary", 9, -1);
        public static REL_OP_CHANNEL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_dictionary", 4, false, 2, "dictionary", 9, -1);
        public static REL_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("params", 5, true, 25, "op_Dictionary_params", 9, -1);
        public static getInstance(): meta.MetaDictionary {
            if (MetaDictionary.INSTANCE == null) {
                MetaDictionary.INSTANCE = new meta.MetaDictionary();
            }
            return MetaDictionary.INSTANCE;
        }

        constructor() {
            super("Dictionary", 9, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaDictionary.REL_METADATA;
            temp_all[1] = MetaDictionary.REL_OP_COMPONENT_DICTIONARY;
            temp_all[2] = MetaDictionary.REL_OP_NODE_DICTIONARY;
            temp_all[3] = MetaDictionary.REL_OP_INSTANCE_DICTIONARY;
            temp_all[4] = MetaDictionary.REL_OP_CHANNEL_DICTIONARY;
            temp_all[5] = MetaDictionary.REL_PARAMS;
            this.init(temp_all);
        }

    }

    export class MetaDictionaryType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaDictionaryType = null;
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 0, true, 6, "op_DictionaryType_metaData", 16, -1);
        public static REL_OP_GROUPTYPE_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_GroupType_dictionary", 1, false, 20, "dictionary", 16, -1);
        public static REL_OP_TYPEDEFINITION_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_TypeDefinition_dictionary", 2, false, 8, "dictionary", 16, -1);
        public static REL_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("params", 3, true, 23, "op_DictionaryType_params", 16, -1);
        public static REL_OP_NODETYPE_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_NodeType_dictionary", 4, false, 19, "dictionary", 16, -1);
        public static getInstance(): meta.MetaDictionaryType {
            if (MetaDictionaryType.INSTANCE == null) {
                MetaDictionaryType.INSTANCE = new meta.MetaDictionaryType();
            }
            return MetaDictionaryType.INSTANCE;
        }

        constructor() {
            super("DictionaryType", 16, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaDictionaryType.REL_METADATA;
            temp_all[1] = MetaDictionaryType.REL_OP_GROUPTYPE_DICTIONARY;
            temp_all[2] = MetaDictionaryType.REL_OP_TYPEDEFINITION_DICTIONARY;
            temp_all[3] = MetaDictionaryType.REL_PARAMS;
            temp_all[4] = MetaDictionaryType.REL_OP_NODETYPE_DICTIONARY;
            this.init(temp_all);
        }

    }

    export class MetaElement extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaElement = null;
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 0, true, 6, "op_Element_metaData", 5, -1);
        public static getInstance(): meta.MetaElement {
            if (MetaElement.INSTANCE == null) {
                MetaElement.INSTANCE = new meta.MetaElement();
            }
            return MetaElement.INSTANCE;
        }

        constructor() {
            super("Element", 5, null, new Int32Array([]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaElement.REL_METADATA;
            this.init(temp_all);
        }

    }

    export class MetaFragmentDictionary extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaFragmentDictionary = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_FragmentDictionary_metaData", 13, -1);
        public static REL_OP_COMPONENT_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_dictionary", 2, false, 10, "dictionary", 13, -1);
        public static REL_OP_CHANNEL_FRAGMENTDICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_fragmentDictionary", 3, false, 2, "fragmentDictionary", 13, -1);
        public static REL_OP_GROUP_FRAGMENTDICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Group_fragmentDictionary", 4, false, 3, "fragmentDictionary", 13, -1);
        public static REL_OP_NODE_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_dictionary", 5, false, 1, "dictionary", 13, -1);
        public static REL_OP_INSTANCE_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_dictionary", 6, false, 7, "dictionary", 13, -1);
        public static REL_OP_CHANNEL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_dictionary", 7, false, 2, "dictionary", 13, -1);
        public static REL_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("params", 8, true, 25, "op_FragmentDictionary_params", 13, -1);
        public static getInstance(): meta.MetaFragmentDictionary {
            if (MetaFragmentDictionary.INSTANCE == null) {
                MetaFragmentDictionary.INSTANCE = new meta.MetaFragmentDictionary();
            }
            return MetaFragmentDictionary.INSTANCE;
        }

        constructor() {
            super("FragmentDictionary", 13, null, new Int32Array([9]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaFragmentDictionary.ATT_NAME;
            temp_all[1] = MetaFragmentDictionary.REL_METADATA;
            temp_all[2] = MetaFragmentDictionary.REL_OP_COMPONENT_DICTIONARY;
            temp_all[3] = MetaFragmentDictionary.REL_OP_CHANNEL_FRAGMENTDICTIONARY;
            temp_all[4] = MetaFragmentDictionary.REL_OP_GROUP_FRAGMENTDICTIONARY;
            temp_all[5] = MetaFragmentDictionary.REL_OP_NODE_DICTIONARY;
            temp_all[6] = MetaFragmentDictionary.REL_OP_INSTANCE_DICTIONARY;
            temp_all[7] = MetaFragmentDictionary.REL_OP_CHANNEL_DICTIONARY;
            temp_all[8] = MetaFragmentDictionary.REL_PARAMS;
            this.init(temp_all);
        }

    }

    export class MetaGroup extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaGroup = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_Instance_metaData", 3, -1);
        public static REL_NODES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("nodes", 3, true, 1, "groups", 3, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 4, true, 9, "op_Instance_dictionary", 3, 1);
        public static REL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("typeDefinition", 5, true, 8, "op_Instance_typeDefinition", 3, 1);
        public static REL_OP_MODEL_GROUPS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Model_groups", 6, false, 0, "groups", 3, -1);
        public static REL_FRAGMENTDICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("fragmentDictionary", 7, true, 13, "op_Group_fragmentDictionary", 3, 1);
        public static getInstance(): meta.MetaGroup {
            if (MetaGroup.INSTANCE == null) {
                MetaGroup.INSTANCE = new meta.MetaGroup();
            }
            return MetaGroup.INSTANCE;
        }

        constructor() {
            super("Group", 3, null, new Int32Array([7]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaGroup.ATT_NAME;
            temp_all[1] = MetaGroup.ATT_STARTED;
            temp_all[2] = MetaGroup.REL_METADATA;
            temp_all[3] = MetaGroup.REL_NODES;
            temp_all[4] = MetaGroup.REL_DICTIONARY;
            temp_all[5] = MetaGroup.REL_TYPEDEFINITION;
            temp_all[6] = MetaGroup.REL_OP_MODEL_GROUPS;
            temp_all[7] = MetaGroup.REL_FRAGMENTDICTIONARY;
            this.init(temp_all);
        }

    }

    export class MetaGroupType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaGroupType = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REMOTE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("remote", 2, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 3, 0, false, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 4, true, 6, "op_GroupType_metaData", 20, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 5, true, 16, "op_GroupType_dictionary", 20, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_typeDefinition", 6, false, 1, "typeDefinition", 20, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_typeDefinition", 7, false, 7, "typeDefinition", 20, -1);
        public static REL_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("deployUnits", 8, true, 17, "op_GroupType_deployUnits", 20, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 9, false, 4, "typeDefinitions", 20, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_typeDefinition", 10, false, 10, "typeDefinition", 20, -1);
        public static REL_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("preferedVersions", 11, true, 18, "op_GroupType_preferedVersions", 20, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_typeDefinition", 12, false, 2, "typeDefinition", 20, -1);
        public static getInstance(): meta.MetaGroupType {
            if (MetaGroupType.INSTANCE == null) {
                MetaGroupType.INSTANCE = new meta.MetaGroupType();
            }
            return MetaGroupType.INSTANCE;
        }

        constructor() {
            super("GroupType", 20, null, new Int32Array([8]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaGroupType.ATT_NAME;
            temp_all[1] = MetaGroupType.ATT_DESCRIPTION;
            temp_all[2] = MetaGroupType.ATT_REMOTE;
            temp_all[3] = MetaGroupType.ATT_VERSION;
            temp_all[4] = MetaGroupType.REL_METADATA;
            temp_all[5] = MetaGroupType.REL_DICTIONARY;
            temp_all[6] = MetaGroupType.REL_OP_NODE_TYPEDEFINITION;
            temp_all[7] = MetaGroupType.REL_OP_INSTANCE_TYPEDEFINITION;
            temp_all[8] = MetaGroupType.REL_DEPLOYUNITS;
            temp_all[9] = MetaGroupType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
            temp_all[10] = MetaGroupType.REL_OP_COMPONENT_TYPEDEFINITION;
            temp_all[11] = MetaGroupType.REL_PREFEREDVERSIONS;
            temp_all[12] = MetaGroupType.REL_OP_CHANNEL_TYPEDEFINITION;
            this.init(temp_all);
        }

    }

    export class MetaInputPort extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaInputPort = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_Port_metaData", 11, -1);
        public static REL_COMPONENTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("components", 2, true, 10, "inputs", 11, -1);
        public static REL_CHANNELS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("channels", 3, true, 2, "inputs", 11, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 4, true, 15, "op_Port_type", 11, -1);
        public static getInstance(): meta.MetaInputPort {
            if (MetaInputPort.INSTANCE == null) {
                MetaInputPort.INSTANCE = new meta.MetaInputPort();
            }
            return MetaInputPort.INSTANCE;
        }

        constructor() {
            super("InputPort", 11, null, new Int32Array([14]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaInputPort.ATT_NAME;
            temp_all[1] = MetaInputPort.REL_METADATA;
            temp_all[2] = MetaInputPort.REL_COMPONENTS;
            temp_all[3] = MetaInputPort.REL_CHANNELS;
            temp_all[4] = MetaInputPort.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaInstance extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaInstance = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_Instance_metaData", 7, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 3, true, 9, "op_Instance_dictionary", 7, 1);
        public static REL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("typeDefinition", 4, true, 8, "op_Instance_typeDefinition", 7, 1);
        public static getInstance(): meta.MetaInstance {
            if (MetaInstance.INSTANCE == null) {
                MetaInstance.INSTANCE = new meta.MetaInstance();
            }
            return MetaInstance.INSTANCE;
        }

        constructor() {
            super("Instance", 7, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaInstance.ATT_NAME;
            temp_all[1] = MetaInstance.ATT_STARTED;
            temp_all[2] = MetaInstance.REL_METADATA;
            temp_all[3] = MetaInstance.REL_DICTIONARY;
            temp_all[4] = MetaInstance.REL_TYPEDEFINITION;
            this.init(temp_all);
        }

    }

    export class MetaItem extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaItem = null;
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OP_CHOICEPARAMTYPE_CHOICES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ChoiceParamType_choices", 1, false, 34, "choices", 30, -1);
        public static REL_OP_LISTPARAMTYPE_DEFAULT: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParamType_default", 2, false, 35, "default", 30, -1);
        public static REL_OP_LISTPARAM_VALUES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParam_values", 3, false, 29, "values", 30, -1);
        public static getInstance(): meta.MetaItem {
            if (MetaItem.INSTANCE == null) {
                MetaItem.INSTANCE = new meta.MetaItem();
            }
            return MetaItem.INSTANCE;
        }

        constructor() {
            super("Item", 30, null, new Int32Array([]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaItem.ATT_VALUE;
            temp_all[1] = MetaItem.REL_OP_CHOICEPARAMTYPE_CHOICES;
            temp_all[2] = MetaItem.REL_OP_LISTPARAMTYPE_DEFAULT;
            temp_all[3] = MetaItem.REL_OP_LISTPARAM_VALUES;
            this.init(temp_all);
        }

    }

    export class MetaListParam extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaListParam = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_Param_metaData", 29, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Dictionary_params", 2, false, 9, "params", 29, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_FragmentDictionary_params", 3, false, 13, "params", 29, -1);
        public static REL_VALUES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("values", 4, true, 30, "op_ListParam_values", 29, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 5, true, 23, "op_Param_type", 29, -1);
        public static getInstance(): meta.MetaListParam {
            if (MetaListParam.INSTANCE == null) {
                MetaListParam.INSTANCE = new meta.MetaListParam();
            }
            return MetaListParam.INSTANCE;
        }

        constructor() {
            super("ListParam", 29, null, new Int32Array([25]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaListParam.ATT_NAME;
            temp_all[1] = MetaListParam.REL_METADATA;
            temp_all[2] = MetaListParam.REL_OP_DICTIONARY_PARAMS;
            temp_all[3] = MetaListParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
            temp_all[4] = MetaListParam.REL_VALUES;
            temp_all[5] = MetaListParam.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaListParamType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaListParamType = null;
        public static ATT_FRAGMENT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragment", 0, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("required", 3, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 4, true, 6, "op_ListParamType_metaData", 35, -1);
        public static REL_OP_PARAM_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_type", 5, false, 25, "type", 35, -1);
        public static REL_DEFAULT: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("default", 6, true, 30, "op_ListParamType_default", 35, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 16, "params", 35, -1);
        public static REL_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("constraints", 8, true, 24, "op_ListParamType_constraints", 35, -1);
        public static getInstance(): meta.MetaListParamType {
            if (MetaListParamType.INSTANCE == null) {
                MetaListParamType.INSTANCE = new meta.MetaListParamType();
            }
            return MetaListParamType.INSTANCE;
        }

        constructor() {
            super("ListParamType", 35, null, new Int32Array([23]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaListParamType.ATT_FRAGMENT;
            temp_all[1] = MetaListParamType.ATT_NAME;
            temp_all[2] = MetaListParamType.ATT_DESCRIPTION;
            temp_all[3] = MetaListParamType.ATT_REQUIRED;
            temp_all[4] = MetaListParamType.REL_METADATA;
            temp_all[5] = MetaListParamType.REL_OP_PARAM_TYPE;
            temp_all[6] = MetaListParamType.REL_DEFAULT;
            temp_all[7] = MetaListParamType.REL_OP_DICTIONARYTYPE_PARAMS;
            temp_all[8] = MetaListParamType.REL_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaMaxConstraint extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaMaxConstraint = null;
        public static ATT_EXCLUSIVE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("exclusive", 0, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 1, 0, false, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_MaxConstraint_metaData", 37, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParamType_constraints", 3, false, 35, "constraints", 37, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_StringParamType_constraints", 4, false, 31, "constraints", 37, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ParamType_constraints", 5, false, 23, "constraints", 37, -1);
        public static getInstance(): meta.MetaMaxConstraint {
            if (MetaMaxConstraint.INSTANCE == null) {
                MetaMaxConstraint.INSTANCE = new meta.MetaMaxConstraint();
            }
            return MetaMaxConstraint.INSTANCE;
        }

        constructor() {
            super("MaxConstraint", 37, null, new Int32Array([24]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaMaxConstraint.ATT_EXCLUSIVE;
            temp_all[1] = MetaMaxConstraint.ATT_VALUE;
            temp_all[2] = MetaMaxConstraint.REL_METADATA;
            temp_all[3] = MetaMaxConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
            temp_all[4] = MetaMaxConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
            temp_all[5] = MetaMaxConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaMinConstraint extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaMinConstraint = null;
        public static ATT_EXCLUSIVE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("exclusive", 0, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 1, 0, false, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_MinConstraint_metaData", 36, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParamType_constraints", 3, false, 35, "constraints", 36, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_StringParamType_constraints", 4, false, 31, "constraints", 36, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ParamType_constraints", 5, false, 23, "constraints", 36, -1);
        public static getInstance(): meta.MetaMinConstraint {
            if (MetaMinConstraint.INSTANCE == null) {
                MetaMinConstraint.INSTANCE = new meta.MetaMinConstraint();
            }
            return MetaMinConstraint.INSTANCE;
        }

        constructor() {
            super("MinConstraint", 36, null, new Int32Array([24]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaMinConstraint.ATT_EXCLUSIVE;
            temp_all[1] = MetaMinConstraint.ATT_VALUE;
            temp_all[2] = MetaMinConstraint.REL_METADATA;
            temp_all[3] = MetaMinConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
            temp_all[4] = MetaMinConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
            temp_all[5] = MetaMinConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaModel extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaModel = null;
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 0, true, 6, "op_Model_metaData", 0, -1);
        public static REL_NODES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("nodes", 1, true, 1, "op_Model_nodes", 0, -1);
        public static REL_CHANNELS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("channels", 2, true, 2, "op_Model_channels", 0, -1);
        public static REL_GROUPS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("groups", 3, true, 3, "op_Model_groups", 0, -1);
        public static REL_NAMESPACES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("namespaces", 4, true, 4, "op_Model_namespaces", 0, -1);
        public static getInstance(): meta.MetaModel {
            if (MetaModel.INSTANCE == null) {
                MetaModel.INSTANCE = new meta.MetaModel();
            }
            return MetaModel.INSTANCE;
        }

        constructor() {
            super("Model", 0, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaModel.REL_METADATA;
            temp_all[1] = MetaModel.REL_NODES;
            temp_all[2] = MetaModel.REL_CHANNELS;
            temp_all[3] = MetaModel.REL_GROUPS;
            temp_all[4] = MetaModel.REL_NAMESPACES;
            this.init(temp_all);
        }

    }

    export class MetaMultilineConstraint extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaMultilineConstraint = null;
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 0, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_MultilineConstraint_metaData", 38, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParamType_constraints", 2, false, 35, "constraints", 38, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_StringParamType_constraints", 3, false, 31, "constraints", 38, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ParamType_constraints", 4, false, 23, "constraints", 38, -1);
        public static getInstance(): meta.MetaMultilineConstraint {
            if (MetaMultilineConstraint.INSTANCE == null) {
                MetaMultilineConstraint.INSTANCE = new meta.MetaMultilineConstraint();
            }
            return MetaMultilineConstraint.INSTANCE;
        }

        constructor() {
            super("MultilineConstraint", 38, null, new Int32Array([24]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaMultilineConstraint.ATT_VALUE;
            temp_all[1] = MetaMultilineConstraint.REL_METADATA;
            temp_all[2] = MetaMultilineConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
            temp_all[3] = MetaMultilineConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
            temp_all[4] = MetaMultilineConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaNamespace extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaNamespace = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_Namespace_metaData", 4, -1);
        public static REL_TYPEDEFINITIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("typeDefinitions", 2, true, 8, "op_Namespace_typeDefinitions", 4, -1);
        public static REL_OP_MODEL_NAMESPACES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Model_namespaces", 3, false, 0, "namespaces", 4, -1);
        public static getInstance(): meta.MetaNamespace {
            if (MetaNamespace.INSTANCE == null) {
                MetaNamespace.INSTANCE = new meta.MetaNamespace();
            }
            return MetaNamespace.INSTANCE;
        }

        constructor() {
            super("Namespace", 4, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaNamespace.ATT_NAME;
            temp_all[1] = MetaNamespace.REL_METADATA;
            temp_all[2] = MetaNamespace.REL_TYPEDEFINITIONS;
            temp_all[3] = MetaNamespace.REL_OP_MODEL_NAMESPACES;
            this.init(temp_all);
        }

    }

    export class MetaNode extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaNode = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_Node_metaData", 1, -1);
        public static REL_OP_NODE_HOST: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_host", 3, false, 1, "host", 1, -1);
        public static REL_OP_MODEL_NODES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Model_nodes", 4, false, 0, "nodes", 1, -1);
        public static REL_COMPONENTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("components", 5, true, 10, "host", 1, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 6, true, 9, "op_Node_dictionary", 1, 1);
        public static REL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("typeDefinition", 7, true, 8, "op_Node_typeDefinition", 1, 1);
        public static REL_HOST: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("host", 8, true, 1, "op_Node_host", 1, 1);
        public static REL_GROUPS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("groups", 9, true, 3, "nodes", 1, -1);
        public static REL_SUBNODES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("subNodes", 10, true, 1, "op_Node_subNodes", 1, -1);
        public static REL_OP_NODE_SUBNODES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_subNodes", 11, false, 1, "subNodes", 1, -1);
        public static getInstance(): meta.MetaNode {
            if (MetaNode.INSTANCE == null) {
                MetaNode.INSTANCE = new meta.MetaNode();
            }
            return MetaNode.INSTANCE;
        }

        constructor() {
            super("Node", 1, null, new Int32Array([7]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaNode.ATT_NAME;
            temp_all[1] = MetaNode.ATT_STARTED;
            temp_all[2] = MetaNode.REL_METADATA;
            temp_all[3] = MetaNode.REL_OP_NODE_HOST;
            temp_all[4] = MetaNode.REL_OP_MODEL_NODES;
            temp_all[5] = MetaNode.REL_COMPONENTS;
            temp_all[6] = MetaNode.REL_DICTIONARY;
            temp_all[7] = MetaNode.REL_TYPEDEFINITION;
            temp_all[8] = MetaNode.REL_HOST;
            temp_all[9] = MetaNode.REL_GROUPS;
            temp_all[10] = MetaNode.REL_SUBNODES;
            temp_all[11] = MetaNode.REL_OP_NODE_SUBNODES;
            this.init(temp_all);
        }

    }

    export class MetaNodeType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaNodeType = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 2, 0, false, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 3, true, 6, "op_NodeType_metaData", 19, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 4, true, 16, "op_NodeType_dictionary", 19, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_typeDefinition", 5, false, 1, "typeDefinition", 19, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_typeDefinition", 6, false, 7, "typeDefinition", 19, -1);
        public static REL_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("deployUnits", 7, true, 17, "op_NodeType_deployUnits", 19, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 8, false, 4, "typeDefinitions", 19, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_typeDefinition", 9, false, 10, "typeDefinition", 19, -1);
        public static REL_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("preferedVersions", 10, true, 18, "op_NodeType_preferedVersions", 19, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_typeDefinition", 11, false, 2, "typeDefinition", 19, -1);
        public static getInstance(): meta.MetaNodeType {
            if (MetaNodeType.INSTANCE == null) {
                MetaNodeType.INSTANCE = new meta.MetaNodeType();
            }
            return MetaNodeType.INSTANCE;
        }

        constructor() {
            super("NodeType", 19, null, new Int32Array([8]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaNodeType.ATT_NAME;
            temp_all[1] = MetaNodeType.ATT_DESCRIPTION;
            temp_all[2] = MetaNodeType.ATT_VERSION;
            temp_all[3] = MetaNodeType.REL_METADATA;
            temp_all[4] = MetaNodeType.REL_DICTIONARY;
            temp_all[5] = MetaNodeType.REL_OP_NODE_TYPEDEFINITION;
            temp_all[6] = MetaNodeType.REL_OP_INSTANCE_TYPEDEFINITION;
            temp_all[7] = MetaNodeType.REL_DEPLOYUNITS;
            temp_all[8] = MetaNodeType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
            temp_all[9] = MetaNodeType.REL_OP_COMPONENT_TYPEDEFINITION;
            temp_all[10] = MetaNodeType.REL_PREFEREDVERSIONS;
            temp_all[11] = MetaNodeType.REL_OP_CHANNEL_TYPEDEFINITION;
            this.init(temp_all);
        }

    }

    export class MetaNumberParam extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaNumberParam = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_Param_metaData", 27, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Dictionary_params", 3, false, 9, "params", 27, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_FragmentDictionary_params", 4, false, 13, "params", 27, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 5, true, 23, "op_Param_type", 27, -1);
        public static getInstance(): meta.MetaNumberParam {
            if (MetaNumberParam.INSTANCE == null) {
                MetaNumberParam.INSTANCE = new meta.MetaNumberParam();
            }
            return MetaNumberParam.INSTANCE;
        }

        constructor() {
            super("NumberParam", 27, null, new Int32Array([25]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaNumberParam.ATT_NAME;
            temp_all[1] = MetaNumberParam.ATT_VALUE;
            temp_all[2] = MetaNumberParam.REL_METADATA;
            temp_all[3] = MetaNumberParam.REL_OP_DICTIONARY_PARAMS;
            temp_all[4] = MetaNumberParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
            temp_all[5] = MetaNumberParam.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaNumberParamType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaNumberParamType = null;
        public static ATT_DEFAULT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("default", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_TYPE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("type", 4, 0, false, 0, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("required", 5, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 6, true, 6, "op_ParamType_metaData", 32, -1);
        public static REL_OP_PARAM_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_type", 7, false, 25, "type", 32, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_params", 8, false, 16, "params", 32, -1);
        public static REL_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("constraints", 9, true, 24, "op_ParamType_constraints", 32, -1);
        public static getInstance(): meta.MetaNumberParamType {
            if (MetaNumberParamType.INSTANCE == null) {
                MetaNumberParamType.INSTANCE = new meta.MetaNumberParamType();
            }
            return MetaNumberParamType.INSTANCE;
        }

        constructor() {
            super("NumberParamType", 32, null, new Int32Array([23]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaNumberParamType.ATT_DEFAULT;
            temp_all[1] = MetaNumberParamType.ATT_FRAGMENT;
            temp_all[2] = MetaNumberParamType.ATT_NAME;
            temp_all[3] = MetaNumberParamType.ATT_DESCRIPTION;
            temp_all[4] = MetaNumberParamType.ATT_TYPE;
            temp_all[5] = MetaNumberParamType.ATT_REQUIRED;
            temp_all[6] = MetaNumberParamType.REL_METADATA;
            temp_all[7] = MetaNumberParamType.REL_OP_PARAM_TYPE;
            temp_all[8] = MetaNumberParamType.REL_OP_DICTIONARYTYPE_PARAMS;
            temp_all[9] = MetaNumberParamType.REL_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaNumberType extends kmf.meta.impl.MetaEnum implements kmf.KType {

        public static DOUBLE: NumberType = new impl.NumberTypeLiteral("DOUBLE", 0, "NumberType");
        public static FLOAT: NumberType = new impl.NumberTypeLiteral("FLOAT", 1, "NumberType");
        public static INT: NumberType = new impl.NumberTypeLiteral("INT", 2, "NumberType");
        public static LONG: NumberType = new impl.NumberTypeLiteral("LONG", 3, "NumberType");
        public static SHORT: NumberType = new impl.NumberTypeLiteral("SHORT", 4, "NumberType");
        private static INSTANCE: meta.MetaNumberType;
        public static getInstance(): meta.MetaNumberType {
            if (MetaNumberType.INSTANCE == null) {
                MetaNumberType.INSTANCE = new meta.MetaNumberType();
            }
            return MetaNumberType.INSTANCE;
        }

        constructor() {
            super("NumberType", 0);
            var p_lits_arr: kmf.meta.KLiteral[] = new Array();
            p_lits_arr[0] = MetaNumberType.DOUBLE;
            p_lits_arr[1] = MetaNumberType.FLOAT;
            p_lits_arr[2] = MetaNumberType.INT;
            p_lits_arr[3] = MetaNumberType.LONG;
            p_lits_arr[4] = MetaNumberType.SHORT;
            this.init(p_lits_arr);
        }

    }

    export class MetaOutputPort extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaOutputPort = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_Port_metaData", 12, -1);
        public static REL_COMPONENTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("components", 2, true, 10, "outputs", 12, -1);
        public static REL_CHANNELS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("channels", 3, true, 2, "outputs", 12, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 4, true, 15, "op_Port_type", 12, -1);
        public static getInstance(): meta.MetaOutputPort {
            if (MetaOutputPort.INSTANCE == null) {
                MetaOutputPort.INSTANCE = new meta.MetaOutputPort();
            }
            return MetaOutputPort.INSTANCE;
        }

        constructor() {
            super("OutputPort", 12, null, new Int32Array([14]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaOutputPort.ATT_NAME;
            temp_all[1] = MetaOutputPort.REL_METADATA;
            temp_all[2] = MetaOutputPort.REL_COMPONENTS;
            temp_all[3] = MetaOutputPort.REL_CHANNELS;
            temp_all[4] = MetaOutputPort.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaParam extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaParam = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_Param_metaData", 25, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Dictionary_params", 2, false, 9, "params", 25, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_FragmentDictionary_params", 3, false, 13, "params", 25, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 4, true, 23, "op_Param_type", 25, -1);
        public static getInstance(): meta.MetaParam {
            if (MetaParam.INSTANCE == null) {
                MetaParam.INSTANCE = new meta.MetaParam();
            }
            return MetaParam.INSTANCE;
        }

        constructor() {
            super("Param", 25, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaParam.ATT_NAME;
            temp_all[1] = MetaParam.REL_METADATA;
            temp_all[2] = MetaParam.REL_OP_DICTIONARY_PARAMS;
            temp_all[3] = MetaParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
            temp_all[4] = MetaParam.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaParamType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaParamType = null;
        public static ATT_FRAGMENT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragment", 0, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 1, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("required", 3, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 4, true, 6, "op_ParamType_metaData", 23, -1);
        public static REL_OP_PARAM_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_type", 5, false, 25, "type", 23, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_params", 6, false, 16, "params", 23, -1);
        public static REL_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("constraints", 7, true, 24, "op_ParamType_constraints", 23, -1);
        public static getInstance(): meta.MetaParamType {
            if (MetaParamType.INSTANCE == null) {
                MetaParamType.INSTANCE = new meta.MetaParamType();
            }
            return MetaParamType.INSTANCE;
        }

        constructor() {
            super("ParamType", 23, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaParamType.ATT_FRAGMENT;
            temp_all[1] = MetaParamType.ATT_NAME;
            temp_all[2] = MetaParamType.ATT_DESCRIPTION;
            temp_all[3] = MetaParamType.ATT_REQUIRED;
            temp_all[4] = MetaParamType.REL_METADATA;
            temp_all[5] = MetaParamType.REL_OP_PARAM_TYPE;
            temp_all[6] = MetaParamType.REL_OP_DICTIONARYTYPE_PARAMS;
            temp_all[7] = MetaParamType.REL_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaPort extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaPort = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_Port_metaData", 14, -1);
        public static REL_COMPONENTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("components", 2, true, 10, "outputs", 14, 1);
        public static REL_CHANNELS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("channels", 3, true, 2, "outputs", 14, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 4, true, 15, "op_Port_type", 14, -1);
        public static getInstance(): meta.MetaPort {
            if (MetaPort.INSTANCE == null) {
                MetaPort.INSTANCE = new meta.MetaPort();
            }
            return MetaPort.INSTANCE;
        }

        constructor() {
            super("Port", 14, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaPort.ATT_NAME;
            temp_all[1] = MetaPort.REL_METADATA;
            temp_all[2] = MetaPort.REL_COMPONENTS;
            temp_all[3] = MetaPort.REL_CHANNELS;
            temp_all[4] = MetaPort.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaPortType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaPortType = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 1, true, 6, "op_PortType_metaData", 15, -1);
        public static REL_PROTOCOL: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("protocol", 2, true, 6, "op_PortType_protocol", 15, -1);
        public static REL_OP_COMPONENTTYPE_OUTPUTTYPES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ComponentType_outputTypes", 3, false, 22, "outputTypes", 15, -1);
        public static REL_OP_PORT_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Port_type", 4, false, 14, "type", 15, -1);
        public static REL_OP_COMPONENTTYPE_INPUTTYPES: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ComponentType_inputTypes", 5, false, 22, "inputTypes", 15, -1);
        public static getInstance(): meta.MetaPortType {
            if (MetaPortType.INSTANCE == null) {
                MetaPortType.INSTANCE = new meta.MetaPortType();
            }
            return MetaPortType.INSTANCE;
        }

        constructor() {
            super("PortType", 15, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaPortType.ATT_NAME;
            temp_all[1] = MetaPortType.REL_METADATA;
            temp_all[2] = MetaPortType.REL_PROTOCOL;
            temp_all[3] = MetaPortType.REL_OP_COMPONENTTYPE_OUTPUTTYPES;
            temp_all[4] = MetaPortType.REL_OP_PORT_TYPE;
            temp_all[5] = MetaPortType.REL_OP_COMPONENTTYPE_INPUTTYPES;
            this.init(temp_all);
        }

    }

    export class MetaPreferedVersion extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaPreferedVersion = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_PLATFORM: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("platform", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 3, true, 6, "op_PreferedVersion_metaData", 18, -1);
        public static REL_OP_NODETYPE_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_NodeType_preferedVersions", 4, false, 19, "preferedVersions", 18, -1);
        public static REL_OP_TYPEDEFINITION_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_TypeDefinition_preferedVersions", 5, false, 8, "preferedVersions", 18, -1);
        public static REL_OP_GROUPTYPE_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_GroupType_preferedVersions", 6, false, 20, "preferedVersions", 18, -1);
        public static getInstance(): meta.MetaPreferedVersion {
            if (MetaPreferedVersion.INSTANCE == null) {
                MetaPreferedVersion.INSTANCE = new meta.MetaPreferedVersion();
            }
            return MetaPreferedVersion.INSTANCE;
        }

        constructor() {
            super("PreferedVersion", 18, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaPreferedVersion.ATT_NAME;
            temp_all[1] = MetaPreferedVersion.ATT_VERSION;
            temp_all[2] = MetaPreferedVersion.ATT_PLATFORM;
            temp_all[3] = MetaPreferedVersion.REL_METADATA;
            temp_all[4] = MetaPreferedVersion.REL_OP_NODETYPE_PREFEREDVERSIONS;
            temp_all[5] = MetaPreferedVersion.REL_OP_TYPEDEFINITION_PREFEREDVERSIONS;
            temp_all[6] = MetaPreferedVersion.REL_OP_GROUPTYPE_PREFEREDVERSIONS;
            this.init(temp_all);
        }

    }

    export class MetaStringParam extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaStringParam = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 2, true, 6, "op_Param_metaData", 26, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Dictionary_params", 3, false, 9, "params", 26, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_FragmentDictionary_params", 4, false, 13, "params", 26, -1);
        public static REL_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("type", 5, true, 23, "op_Param_type", 26, -1);
        public static getInstance(): meta.MetaStringParam {
            if (MetaStringParam.INSTANCE == null) {
                MetaStringParam.INSTANCE = new meta.MetaStringParam();
            }
            return MetaStringParam.INSTANCE;
        }

        constructor() {
            super("StringParam", 26, null, new Int32Array([25]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaStringParam.ATT_NAME;
            temp_all[1] = MetaStringParam.ATT_VALUE;
            temp_all[2] = MetaStringParam.REL_METADATA;
            temp_all[3] = MetaStringParam.REL_OP_DICTIONARY_PARAMS;
            temp_all[4] = MetaStringParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
            temp_all[5] = MetaStringParam.REL_TYPE;
            this.init(temp_all);
        }

    }

    export class MetaStringParamType extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaStringParamType = null;
        public static ATT_DEFAULT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("default", 0, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("required", 4, 0, false, -1, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 5, true, 6, "op_StringParamType_metaData", 31, -1);
        public static REL_OP_PARAM_TYPE: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_type", 6, false, 25, "type", 31, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 16, "params", 31, -1);
        public static REL_CONSTRAINTS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("constraints", 8, true, 24, "op_StringParamType_constraints", 31, -1);
        public static getInstance(): meta.MetaStringParamType {
            if (MetaStringParamType.INSTANCE == null) {
                MetaStringParamType.INSTANCE = new meta.MetaStringParamType();
            }
            return MetaStringParamType.INSTANCE;
        }

        constructor() {
            super("StringParamType", 31, null, new Int32Array([23]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaStringParamType.ATT_DEFAULT;
            temp_all[1] = MetaStringParamType.ATT_FRAGMENT;
            temp_all[2] = MetaStringParamType.ATT_NAME;
            temp_all[3] = MetaStringParamType.ATT_DESCRIPTION;
            temp_all[4] = MetaStringParamType.ATT_REQUIRED;
            temp_all[5] = MetaStringParamType.REL_METADATA;
            temp_all[6] = MetaStringParamType.REL_OP_PARAM_TYPE;
            temp_all[7] = MetaStringParamType.REL_OP_DICTIONARYTYPE_PARAMS;
            temp_all[8] = MetaStringParamType.REL_CONSTRAINTS;
            this.init(temp_all);
        }

    }

    export class MetaTypeDefinition extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaTypeDefinition = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("version", 2, 0, true, -4, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 3, true, 6, "op_TypeDefinition_metaData", 8, -1);
        public static REL_DICTIONARY: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("dictionary", 4, true, 16, "op_TypeDefinition_dictionary", 8, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_typeDefinition", 5, false, 1, "typeDefinition", 8, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_typeDefinition", 6, false, 7, "typeDefinition", 8, -1);
        public static REL_DEPLOYUNITS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("deployUnits", 7, true, 17, "op_TypeDefinition_deployUnits", 8, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 8, false, 4, "typeDefinitions", 8, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_typeDefinition", 9, false, 10, "typeDefinition", 8, -1);
        public static REL_PREFEREDVERSIONS: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("preferedVersions", 10, true, 18, "op_TypeDefinition_preferedVersions", 8, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_typeDefinition", 11, false, 2, "typeDefinition", 8, -1);
        public static getInstance(): meta.MetaTypeDefinition {
            if (MetaTypeDefinition.INSTANCE == null) {
                MetaTypeDefinition.INSTANCE = new meta.MetaTypeDefinition();
            }
            return MetaTypeDefinition.INSTANCE;
        }

        constructor() {
            super("TypeDefinition", 8, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaTypeDefinition.ATT_NAME;
            temp_all[1] = MetaTypeDefinition.ATT_DESCRIPTION;
            temp_all[2] = MetaTypeDefinition.ATT_VERSION;
            temp_all[3] = MetaTypeDefinition.REL_METADATA;
            temp_all[4] = MetaTypeDefinition.REL_DICTIONARY;
            temp_all[5] = MetaTypeDefinition.REL_OP_NODE_TYPEDEFINITION;
            temp_all[6] = MetaTypeDefinition.REL_OP_INSTANCE_TYPEDEFINITION;
            temp_all[7] = MetaTypeDefinition.REL_DEPLOYUNITS;
            temp_all[8] = MetaTypeDefinition.REL_OP_NAMESPACE_TYPEDEFINITIONS;
            temp_all[9] = MetaTypeDefinition.REL_OP_COMPONENT_TYPEDEFINITION;
            temp_all[10] = MetaTypeDefinition.REL_PREFEREDVERSIONS;
            temp_all[11] = MetaTypeDefinition.REL_OP_CHANNEL_TYPEDEFINITION;
            this.init(temp_all);
        }

    }

    export class MetaValue extends kmf.meta.impl.MetaClass {

        private static INSTANCE: meta.MetaValue = null;
        public static ATT_NAME: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.meta.KMetaAttribute = new kmf.meta.impl.MetaAttribute("value", 1, 0, false, -2, kmf.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OP_FRAGMENTDICTIONARY_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_FragmentDictionary_metaData", 2, false, 13, "metaData", 6, -1);
        public static REL_OP_DEPLOYUNIT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DeployUnit_metaData", 3, false, 17, "metaData", 6, -1);
        public static REL_OP_NODETYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_NodeType_metaData", 4, false, 19, "metaData", 6, -1);
        public static REL_OP_INSTANCE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Instance_metaData", 5, false, 7, "metaData", 6, -1);
        public static REL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("metaData", 6, true, 6, "op_Value_metaData", 6, -1);
        public static REL_OP_PORTTYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_PortType_metaData", 7, false, 15, "metaData", 6, -1);
        public static REL_OP_TYPEDEFINITION_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_TypeDefinition_metaData", 8, false, 8, "metaData", 6, -1);
        public static REL_OP_PARAM_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Param_metaData", 9, false, 25, "metaData", 6, -1);
        public static REL_OP_VALUE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Value_metaData", 10, false, 6, "metaData", 6, -1);
        public static REL_OP_MAXCONSTRAINT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_MaxConstraint_metaData", 11, false, 37, "metaData", 6, -1);
        public static REL_OP_MINCONSTRAINT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_MinConstraint_metaData", 12, false, 36, "metaData", 6, -1);
        public static REL_OP_ABSTRACTCONSTRAINT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_AbstractConstraint_metaData", 13, false, 24, "metaData", 6, -1);
        public static REL_OP_DICTIONARYTYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_DictionaryType_metaData", 14, false, 16, "metaData", 6, -1);
        public static REL_OP_PORT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Port_metaData", 15, false, 14, "metaData", 6, -1);
        public static REL_OP_COMPONENT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Component_metaData", 16, false, 10, "metaData", 6, -1);
        public static REL_OP_STRINGPARAMTYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_StringParamType_metaData", 17, false, 31, "metaData", 6, -1);
        public static REL_OP_MODEL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Model_metaData", 18, false, 0, "metaData", 6, -1);
        public static REL_OP_PORTTYPE_PROTOCOL: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_PortType_protocol", 19, false, 15, "protocol", 6, -1);
        public static REL_OP_PARAMTYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ParamType_metaData", 20, false, 23, "metaData", 6, -1);
        public static REL_OP_DICTIONARY_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Dictionary_metaData", 21, false, 9, "metaData", 6, -1);
        public static REL_OP_GROUPTYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_GroupType_metaData", 22, false, 20, "metaData", 6, -1);
        public static REL_OP_LISTPARAMTYPE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_ListParamType_metaData", 23, false, 35, "metaData", 6, -1);
        public static REL_OP_NAMESPACE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Namespace_metaData", 24, false, 4, "metaData", 6, -1);
        public static REL_OP_PREFEREDVERSION_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_PreferedVersion_metaData", 25, false, 18, "metaData", 6, -1);
        public static REL_OP_MULTILINECONSTRAINT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_MultilineConstraint_metaData", 26, false, 38, "metaData", 6, -1);
        public static REL_OP_CHANNEL_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Channel_metaData", 27, false, 2, "metaData", 6, -1);
        public static REL_OP_NODE_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Node_metaData", 28, false, 1, "metaData", 6, -1);
        public static REL_OP_ELEMENT_METADATA: kmf.meta.KMetaRelation = new kmf.meta.impl.MetaRelation("op_Element_metaData", 29, false, 5, "metaData", 6, -1);
        public static getInstance(): meta.MetaValue {
            if (MetaValue.INSTANCE == null) {
                MetaValue.INSTANCE = new meta.MetaValue();
            }
            return MetaValue.INSTANCE;
        }

        constructor() {
            super("Value", 6, null, new Int32Array([5]));
            var temp_all: kmf.meta.KMeta[] = new Array();
            temp_all[0] = MetaValue.ATT_NAME;
            temp_all[1] = MetaValue.ATT_VALUE;
            temp_all[2] = MetaValue.REL_OP_FRAGMENTDICTIONARY_METADATA;
            temp_all[3] = MetaValue.REL_OP_DEPLOYUNIT_METADATA;
            temp_all[4] = MetaValue.REL_OP_NODETYPE_METADATA;
            temp_all[5] = MetaValue.REL_OP_INSTANCE_METADATA;
            temp_all[6] = MetaValue.REL_METADATA;
            temp_all[7] = MetaValue.REL_OP_PORTTYPE_METADATA;
            temp_all[8] = MetaValue.REL_OP_TYPEDEFINITION_METADATA;
            temp_all[9] = MetaValue.REL_OP_PARAM_METADATA;
            temp_all[10] = MetaValue.REL_OP_VALUE_METADATA;
            temp_all[11] = MetaValue.REL_OP_MAXCONSTRAINT_METADATA;
            temp_all[12] = MetaValue.REL_OP_MINCONSTRAINT_METADATA;
            temp_all[13] = MetaValue.REL_OP_ABSTRACTCONSTRAINT_METADATA;
            temp_all[14] = MetaValue.REL_OP_DICTIONARYTYPE_METADATA;
            temp_all[15] = MetaValue.REL_OP_PORT_METADATA;
            temp_all[16] = MetaValue.REL_OP_COMPONENT_METADATA;
            temp_all[17] = MetaValue.REL_OP_STRINGPARAMTYPE_METADATA;
            temp_all[18] = MetaValue.REL_OP_MODEL_METADATA;
            temp_all[19] = MetaValue.REL_OP_PORTTYPE_PROTOCOL;
            temp_all[20] = MetaValue.REL_OP_PARAMTYPE_METADATA;
            temp_all[21] = MetaValue.REL_OP_DICTIONARY_METADATA;
            temp_all[22] = MetaValue.REL_OP_GROUPTYPE_METADATA;
            temp_all[23] = MetaValue.REL_OP_LISTPARAMTYPE_METADATA;
            temp_all[24] = MetaValue.REL_OP_NAMESPACE_METADATA;
            temp_all[25] = MetaValue.REL_OP_PREFEREDVERSION_METADATA;
            temp_all[26] = MetaValue.REL_OP_MULTILINECONSTRAINT_METADATA;
            temp_all[27] = MetaValue.REL_OP_CHANNEL_METADATA;
            temp_all[28] = MetaValue.REL_OP_NODE_METADATA;
            temp_all[29] = MetaValue.REL_OP_ELEMENT_METADATA;
            this.init(temp_all);
        }

    }

}
